---
title: 买卖股票的最佳时机
tags:
  - 买卖股票的最佳时机
sidebar: auto
---

### 买卖股票的最佳时机

::: tip 难度
简单
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-005.jpg)

## [题目:](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

给定一个数组，它的第  i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

**注意：** 你不能在买入股票前卖出股票

### 示例

1. 示例 1

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

2. 示例 2

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-005.png)

设最小结果 x(默认无穷大)
设差值即利润 y

遍历 prices

遇到更小的价格就更新 x
然后计算后面遇到的价格与最小价格的差值

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let x = Number.MAX_VALUE,
    y = 0
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < x) {
      x = prices[i]
    } else if (prices[i] - x > y) {
      y = prices[i] - x
    }
  }
  return y
}
```

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length,
    stack = [],
    _result = 0,
    prices2 = Array(len + 1)
  for (let i = 0; i < len; i++) {
    prices2[i] = prices[i]
  }
  prices2[prices.length] = -1
  for (let i = 0; i < prices2.length; i++) {
    while (!stack.length && stack[0] >= prices2[i]) {
      let top = stack.pop()
      if (stack.length) continue
      _result = Math.max(_result, top - stack[stack.length-1]]) // 出栈时栈顶减去栈底元素
    }
    stack.push(prices2[i])
  }
  return _result
}
```
