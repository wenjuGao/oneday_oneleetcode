/**
 * @param {string[]} maze
 * @return {number}
 */
var minimalSteps = function (maze) {

	let dirs = [
			[-1, 0], // 上方
			[1, 0], // 下方
			[0, -1], // 左侧
			[0, 1], // 右侧
		],
		n = maze.length,
		m = maze[0] ? maze[0].length : 0,
		buttons = [], // 机关->M 坐标集
		stones = [], // 石头->O 坐标集
		start = [-1, -1],
		end = [-1, -1];

	// 查询起点、终点坐标
	// 记录机关、石头坐标
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			// 机关
			if (maze[i].charAt(j) == 'M') {
				buttons.push([i, j])
			}
			// 石头
			if (maze[i].charAt(j) == 'O') {
				stones.push([i, j])
			}
			// 开始
			if (maze[i].charAt(j) == 'S') {
				start = [i, j];
			}
			// 结束
			if (maze[i].charAt(j) == 'T') {
				end = [i, j];
			}
		}
	}

	let nb = buttons.length, // 机关数
		ns = stones.length, // 石头数
		// 记录起点到任一点的步数
		startDist = bfs(start[0], start[1], maze)

	// 边界情况：没有机关直接从起到走到终点及startDist中记录的start坐标到end坐标步数
	if (nb === 0) {
		let end_x = end[0],
			end_y = end[1];
		return startDist[end_x][end_y]
	}

	// 记录从每个机关M到终点步数
	let dist = Array(nb)
	for (let m_i = 0; m_i < nb; m_i++) {
		dist[m_i] = Array(nb + 2).fill(-1)
	}

	// 记录从每个机关M到其他点步数
	let dd = Array(nb)
	for (let i = 0; i < nb; i++) {
		let buttons_x = buttons[i][0],
			buttons_y = buttons[i][1],
			end_x = end[0],
			end_y = end[1],
			d = bfs(buttons_x, buttons_y, maze);
		// 第i个机关到其他点步数矩阵
		dd[i] = d;
		// 第i个机关到终点的步数->存放到dist最后一列
		dist[i][nb + 1] = d[end_x][end_y]
	}

	// 遍历机关M与石头S-计算使用石头触发机关的步数
	for (let i = 0; i < nb; i++) {
		let tmp = -1;

		// 包含起点到石头S部分，即起点为矩阵指定起点
		for (let k = 0; k < ns; k++) {
			// 触发一个M的步数：机关M到石头S的步数+起点到石头S的步数
			let s_x = stones[k][0],
				s_y = stones[k][1];
			// 步数为-1则说明此单元格不通
			if (dd[i][s_x][s_y] !== -1 && startDist[s_x][s_y] !== -1) {
				let item_num = dd[i][s_x][s_y] + startDist[s_x][s_y];
				tmp = tmp !== -1 ? Math.min(tmp, item_num) : item_num;
			}
		}
		// 从开始位置到石头S到机关M最小步数，存放到倒数第二列
		dist[i][nb] = tmp

		// 起点为已触发机关M
		for (let j = i + 1; j < nb; j++) {
			let tmp = -1;
			for (let k = 0; k < ns; k++) {
				let s_x = stones[k][0],
					s_y = stones[k][1];
				if (dd[i][s_x][s_y] != -1 && dd[j][s_x][s_y] != -1) {
					let item_num = dd[i][s_x][s_y] + dd[j][s_x][s_y];
					tmp = tmp !== -1 ? Math.min(tmp, item_num) : item_num;
				}
			}
			dist[i][j] = tmp
			dist[j][i] = tmp
		}
	}

	// 有从机关M出发无法到达终点或起点则说明无法 不存在满足题意的路径
	for (let i = 0; i < nb; i++) {
		if (dist[i][nb] == -1 || dist[i][nb + 1] == -1) {
			return -1
		}
	}

	// dp 数组， -1 代表没有遍历到
	let dp = Array(1 << nb);
	for (let i = 0; i < (1 << nb); i++) {
		dp[i] = Array(nb).fill(-1)
	}
	for (let i = 0; i < nb; i++) {
		// 第i个机关M作为第一个触发机关的步数
		dp[1 << i][i] = dist[i][nb];
	}

	// 由于更新的状态都比未更新的大，所以直接从小到大遍历即可
	// 遍历每个机关点M，查询个M点之间步数最小值
	for (let mask = 1; mask < (1 << nb); mask++) {
		for (let i = 0; i < nb; i++) {
			// 当前 mask 为标记的M
			if ((mask & (1 << i)) !== 0) {
				// 为指定M点mark  遍历其他M点 查询该点到其他M之间的步数
				for (let j = 0; j < nb; j++) {
					// j 不在 mask 里
					if ((mask & (1 << j)) === 0) {
						let next = mask | (1 << j),
							item_num = dp[mask][i] + dist[i][j];
						dp[next][j] = dp[next][j] !== -1 ? Math.min(item_num, dp[next][j]) : item_num;
					}
				}
			}
		}
	}

	let _result = -1,
		finalMask = (1 << nb) - 1;
	for (let i = 0; i < nb; i++) {
		let item_num = dp[finalMask][i] + dist[i][nb + 1];
		_result = _result !== -1 ? Math.min(_result, item_num) : item_num;
	}

	// 参数-> 起点坐标，矩阵
	function bfs(x, y, maze) {
		let result = Array(n);
		for (let i = 0; i < n; i++) {
			result[i] = Array(m).fill(-1);
		}
		result[x][y] = 0;
		let queue = [
			[x, y]
		];
		while (queue.length) {
			let p = queue.shift(),
				curx = p[0],
				cury = p[1];
			for (let k = 0; k < 4; k++) {
				let nx = curx + dirs[k][0],
					ny = cury + dirs[k][1];
				// 取出的点可走的路径->不越界非障碍物#
				if (inBound(nx, ny) && maze[nx].charAt(ny) !== '#' && result[nx][ny] === -1) {
					result[nx][ny] = result[curx][cury] + 1;
					queue.push([nx, ny]);
				}
			}
		}
		// 返回 n*m的矩阵，填充起点为（x,y）是到达每个单元格的步数
		return result;
	}

	// 判断给定坐标是否越界
	function inBound(x, y) {
		return x >= 0 && x < n && y >= 0 && y < m;
	}

	return _result;
}