---
title: 买卖股票的最佳时机含手续费
tags:
  - 买卖股票的最佳时机含手续费
sidebar: auto
---

### 买卖股票的最佳时机含手续费

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-005.jpg)

## [题目:](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

给定一个整数数组  prices，其中第  i  个元素代表了第  i  天的股票价格 ；非负整数  fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

**注意：** 这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

### 示例

1. 示例 1

```
输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
输出: 8
解释: 能够达到的最大利润:
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```

### 注意

- 0 < prices.length <= 50000.
- 0 < prices[i] < 50000.
- 0 <= fee < 50000.

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-005.png)

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  // let y = 0,
  //   num = 0
  // for (let i = 0; i < prices.length - 1; i++) {
  //   // 下一个结果高于当前价格就在当前买入，下个点卖出
  //   if (prices[i + 1] - fee > prices[i]) {
  //     num++
  //     y += prices[i + 1] - prices[i]
  //   }
  // }
  // return y - parseInt(num * fee, 10)
  let len = prices.length
  if (len < 2) return 0

  // cash：持有现金
  // hold：持有股票
  let cash = 0,
    hold = -prices[0] - fee,
    preCash = cash,
    preHold = hold

  for (let i = 1; i < len; i++) {
    cash = Math.max(preCash, preHold + prices[i])
    hold = Math.max(preHold, preCash - prices[i] - fee)

    preCash = cash
    preHold = hold
  }
  return cash
}
```
