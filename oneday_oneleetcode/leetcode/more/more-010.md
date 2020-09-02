---
title: 岛屿数量
tags:
  - 岛屿数量
sidebar: auto
---

### 岛屿数量

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-010.jpg)

## [题目:](https://leetcode-cn.com/problems/number-of-islands/)

给你一个由  '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

### 示例

1. 示例 1

```
输入:
[
['1','1','1','1','0'],
['1','1','0','1','0'],
['1','1','0','0','0'],
['0','0','0','0','0']
]
输出: 1
```

2. 示例 2

```
输入:
[
['1','1','0','0','0'],
['1','1','0','0','0'],
['0','0','1','0','0'],
['0','0','0','1','1']
]
输出: 3
解释: 每座岛屿只能由水平和/或竖直方向上相邻的陆地连接而成。
```

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-010.png)

### 深度优先搜索

- 遍历所有元素
- 元素等于 1
  - 遍历与这个元素相邻的 1，并将遍历到的元素转换成 0

矩阵中遍历相邻逻辑之前在[20200816: 图像渲染 (难度:简单)](../202008/20200816.md)中涉及过

矩阵中遍历与某个节点相邻或者间接相邻的节点：

- 遇到为 1 的位置，递归遍历其上下左右四个方向，遇到非边界且不等于 0 说明与当前位置相邻或者间接相邻，只能计数 1 次

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let _result = 0,
    m = grid.length,
    n = grid[0] ? grid[0].length : 0
  if (m === 0 || n === 0) return 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        fillNUmm(i, j)
        _result++
      }
    }
  }

  function fillNUmm(i, j) {
    if (i < 0 || j < 0 || i > m - 1 || j > n - 1 || grid[i][j] === '0') return

    grid[i][j] = '0'

    fillNUmm(i + 1, j)
    fillNUmm(i, j + 1)
    fillNUmm(i - 1, j)
    fillNUmm(i, j - 1)
  }

  return _result
}
```

### 广度优先搜索（BFS）

同样和图像渲染一样本题一样可以使用广度优先搜索（BFS）解决

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let _result = 0,
    m = grid.length,
    n = grid[0] ? grid[0].length : 0,
    queue = []
  if (m === 0 || n === 0) return 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        _result++
        grid[i][j] = '0'
        queue.push([i, j])
        while (queue.length) {
          let [x, y] = queue.shift()
          if (x - 1 >= 0 && grid[x - 1][y] === '1') {
            grid[x - 1][y] = 0
            queue.push([x - 1, y])
          }
          if (x + 1 < m && grid[x + 1][y] === '1') {
            grid[x + 1][y] = 0
            queue.push([x + 1, y])
          }
          if (y - 1 >= 0 && grid[x][y - 1] === '1') {
            grid[x][y - 1] = 0
            queue.push([x, y - 1])
          }
          if (y + 1 < n && grid[x][y + 1] === '1') {
            grid[x][y + 1] = 0
            queue.push([x, y + 1])
          }
        }
      }
    }
  }

  return _result
}
```
