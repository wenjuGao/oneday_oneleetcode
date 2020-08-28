---
title: 买卖股票的最佳时机 II
tags:
  - 买卖股票的最佳时机 II
sidebar: auto
---

### 买卖股票的最佳时机 II

::: tip 难度
简单
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-006.jpg)

## [题目:](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

**注意：** 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

### 示例

1. 示例 1

```
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
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
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### 提示

- 1 <= prices.length <= 3 \* $10^4$
- 0 <= prices[i] <= $10^4$

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-006.png)

上面一题[买卖股票的最佳时机](./more-005.md)，限制了只允许交易一次，本题交易次数可以任意

- 那么多次交易会对原来的逻辑又什么影响呢？

- 不再枚举单次交易的最大利润，而是枚举多次交易的利润和
- 买入前不能卖出，那么每次交易买入操作都要有边界，及上一次卖出的位置

### 一次遍历

再次回顾上一题的解题逻辑：维护历史最小和最大利润,切换历史最小来更新最大利润,

运行我们多次交易，那么在切换历史最小时我们就可以保留下其产生的利润在切换

- 遍历结果，每次假设当前价格就是 x-历史最小价格
- 如果后面的价格大于它，那就这个点买入，下个点卖出

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let y = 0
  for (let i = 0; i < prices.length - 1; i++) {
    // 下一个结果高于当前价格就在当前买入，下个点卖出
    if (prices[i + 1] > prices[i]) {
      y += prices[i + 1] - prices[i]
    }
  }
  return y
}
```

上面学习了单调栈，这次学下大佬们的动态规范吧：

[暴力搜索、贪心算法、动态规划](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/tan-xin-suan-fa-by-liweiwei1419-2/)

- cash：持有现金的利润
- hold：持有股票的利润
- 处理收尾两天，一直均持有现金，其他任何一天都可能有两种状态，起始利润 cash 为 0，起始买入 hold 利润为-prices[0]（成本）
- 则任意一天，持有现金：
  - 上一天持有现金，则今天操不操作利润不变；
  - 上一天持有股票，（成本已减去，假设卖出结算）今天的利润为上一天的利润加今天的价格
  - 两种情况取最大值：cash = Math.max(上一天的 cash，上一天 hold+今天的价格)
- 则任意一天，持有股票：
  - 上一天持有现金，则今天做了买入操作，买入陈本算入利润：前一天利润减去今天买入价格；
  - 上一天持有股票，则今天依旧持有利润不发生变化(因为今天的状态是持有，今天的价格不能结算到利润中)
  - 两种情况取最大值：hold = Math.max(上一天的 hold，上一天 cash-今天的价格)

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length
  if (len < 2) return 0

  // cash：持有现金
  // hold：持有股票
  let cash = 0,
    hold = -prices[0],
    preCash = cash,
    preHold = hold

  for (let i = 1; i < len; i++) {
    cash = Math.max(preCash, preHold + prices[i])
    hold = Math.max(preHold, preCash - prices[i])

    preCash = cash
    preHold = hold
  }
  return cash
}
```
