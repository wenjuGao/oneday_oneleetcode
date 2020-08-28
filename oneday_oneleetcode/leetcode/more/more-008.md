---
title: 买卖股票的最佳时机 IV
tags:
  - 买卖股票的最佳时机 IV
sidebar: auto
---

### 买卖股票的最佳时机 III

::: tip 难度
困难
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-008.jpg)

## [题目:](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

**注意：** 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

### 示例

1. 示例 1

```
输入: [2,4,1], k = 2
输出: 2
解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
```

2. 示例 2

```
输入: [3,2,6,5,0,3], k = 2
输出: 7
解释: 在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
```

## 抛砖引玉

前一天限制交易两次是动态规划将 k 的值固定为 k，本题 k 通过传入，那么逻辑上上面的动态规划方法解法可以适用本题的：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices, k) {
  let len = prices.length
  if (len == 0) return 0
  k = Math.min(k, parseInt(len / 2, 10))
  let dp = Array.from({ length: len }, () => Array(k + 1))
  for (let i = 0; i < len; i++) {
    for (let j = 0; j <= k; j++) {
      dp[i][j] = Array(2).fill(0)
    }
  }
  for (let i = 0; i < len; i++) {
    for (let j = k; j >= 1; j--) {
      if (i == 0) {
        dp[i][j][0] = 0
        dp[i][j][1] = -prices[i]
        continue
      }
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
    }
  }
  return dp[len - 1][k][0]
}
```

![img](http://qiniu.gaowenju.com/leecode/more-008-01.png)

提交超时：209 / 211 个通过测试用例

k 输入过大，导致 dp 数组申请内存超出限制，

那么兼容 k 过大的情况

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices, k) {
  let len = prices.length
  if (len == 0) return 0
  // k过大处理prices
  if (k > parseInt(len / 2, 10)) maxProfitInfinity(prices)

  let dp = Array.from({ length: len }, () => Array(k + 1))
  for (let i = 0; i < len; i++) {
    for (let j = 0; j <= k; j++) {
      dp[i][j] = Array(2).fill(0)
    }
  }
  for (let i = 0; i < len; i++) {
    for (let j = k; j >= 1; j--) {
      if (i == 0) {
        dp[i][j][0] = 0
        dp[i][j][1] = -prices[i]
        continue
      }
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
    }
  }

  function maxProfitInfinity() {
    let y = 0
    for (let i = 0; i < prices.length - 1; i++) {
      // 下一个结果高于当前价格就在当前买入，下个点卖出
      if (prices[i + 1] > prices[i]) {
        y += prices[i + 1] - prices[i]
      }
    }
    return y
    // let dp = Array.from(new Array(n), () => new Array(2))
    // for (let i = 0; i < n; i++) {
    //   if (i == 0) {
    //     dp[0][0] = 0
    //     dp[0][1] = -prices[0]
    //     continue
    //   }
    //   dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    //   dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1])
    // }
    // return dp[n - 1][0]
  }

  // 返回结果
  return dp[len - 1][k][0]
}
```
