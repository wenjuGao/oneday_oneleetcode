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
        helper(grid, i, j, m, n)
        _result++
      }
    }
  }

  function helper(grid, i, j, m, n) {
    if (i < 0 || j < 0 || i > m - 1 || j > n - 1 || grid[i][j] === '0') return

    grid[i][j] = '0'

    helper(grid, i + 1, j, m, n)
    helper(grid, i, j + 1, m, n)
    helper(grid, i - 1, j, m, n)
    helper(grid, i, j - 1, m, n)
  }

  return _result
}
```
