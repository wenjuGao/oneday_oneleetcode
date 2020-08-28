---
title: 买卖股票的最佳时机 III
tags:
  - 买卖股票的最佳时机 III
sidebar: auto
---

### 买卖股票的最佳时机 III

::: tip 难度
困难
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-007.jpg)

## [题目:](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

**注意：** 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

### 示例

1. 示例 1

```
输入: [3,3,5,0,0,3,1,4]
输出: 6
解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
```

2. 示例 2

```
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。  
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。  
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```

3. 示例 3

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
```

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-007.png)

前面已经做过了：

1. 交易一次最大利润
2. 交易多次最大利润

用到的思路：

- 任意一天区分持有和卖出（持有时记录的利润需要减去购入时的成本价）
- 任意一天的利润受 i->天，k->交易次数,状态->持有|卖出影响

### 动态规划

- dp[i][k]][status],第 i 天，交易 k 次，持有或者卖出（status）的利润

  - i：第 i 天
  - k：交易 k 次
  - status：持有状态,（0->不持有、1->持有）

- 初始值：

  - dp[0][k][0]：第一天不持有，利润 0
  - dp[0][k][1]：第一天持有，利润 -prices[0] （成本）

局部关联(推到公式)：

- dp[i][k]][0]

  - 第 i-1 天不持有：dp[i-1][k]][0]
  - 第 i-1 天持有(即今天卖出，得到 prices[i])：dp[i-1][k]][1] + prices[i]

- dp[i][k]][1]

  - 第 i-1 天持有：dp[i-1][k]][1]
  - 第 i-1 天不持有(即今天买入，完成一次交易，支付 prices[i])：dp[i-1][k-1]][0] - prices[i]

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length
  if (len == 0) return 0
  let dp = Array.from({ length: len }, () => Array(2 + 1))
  for (let i = 0; i < len; i++) {
    for (let k = 0; k <= 2; k++) {
      dp[i][k] = Array(2).fill(0)
    }
  }
  for (let i = 0; i < len; i++) {
    for (let k = 2; k >= 1; k--) {
      if (i == 0) {
        dp[i][k][0] = 0
        dp[i][k][1] = -prices[i]
        continue
      }
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
    }
  }
  // 最后返回交易两次最后不持有的最大利润
  return dp[len - 1][2][0]
}
```

### 降维

- k 已知：1,2，则枚举 k 可以声明固定变量手动枚举
- profitOne0 -> 完成一次交易，不持有的最大利润；dp[i][1]][0]
- profitOne1 -> 完成一次交易，持有的最大利润；dp[i][1]][1]
- profitTwo1 -> 完成两次交易，不持有的最大利润；dp[i][2]][0]
- profitTwo1 -> 完成两次交易，持有的最大利润；dp[i][2]][1]

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices == null || prices.length == 0) {
    return 0
  }
  let profitOne0 = 0,
    profitOne1 = -prices[0],
    profitTwo0 = 0,
    profitTwo1 = -prices[0],
    len = prices.length
  for (let i = 1; i < len; i++) {
    // 当前交易两次且不持有：上一天状态和今天一样利润不变profitTwo0，上一天持有今天卖出
    profitTwo0 = Math.max(profitTwo0, profitTwo1 + prices[i])
    // 当前交易两次、持有：上一天状态和今天一样利润不变profitTwo1，上一天不持有今天买入-prices[i]（成本）
    profitTwo1 = Math.max(profitTwo1, profitOne0 - prices[i])
    // 当前交易一次且不持有：上一天状态和今天一样利润不变profitOne0，上一天持有今天卖出
    profitOne0 = Math.max(profitOne0, profitOne1 + prices[i])
    // 当前交易一次、持有：上一天状态和今天一样利润不变profitOne1，上一天不持有今天买入-prices[i]（成本）
    profitOne1 = Math.max(profitOne1, -prices[i])
  }
  return profitTwo0
}
```
