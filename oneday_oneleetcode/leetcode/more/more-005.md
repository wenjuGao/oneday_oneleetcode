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
      // 更新最小购入价格
      x = prices[i]
    } else if (prices[i] - x > y) {
      // 如果购入价格不变，检查今天卖出利润是否增加，如果增加更新利润
      // 注意：此时x为上次更新的最小购入价格
      y = prices[i] - x
    }
  }
  return y
}
```

### 单调栈

上面一遍循环维护当亲最小值和最大利润，已经满足要求了，看了别的大佬的题解:

[C++ 利用哨兵 👨‍✈️，维护一个单调栈 📈(图解，直观掌握)](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/c-li-yong-shao-bing-wei-hu-yi-ge-dan-diao-zhan-tu-/)

本题逻辑还是比较简单，刚好借助熟悉下单调栈的使用。

声明一个数组 stack，遵循先进后出原则

用单调栈，维护一个栈存 stack 放已经出现过的价格，用栈顶来记录(或者守卫)遇到的最小买入价格：

- 新入栈的价格如果小于栈顶最小结果，则：

  - 记录替换前栈顶与其他栈内元素的最大差值,既原最小价格买入时最大利润
  - 替换栈顶

- 新入栈的价格如果大于栈顶最小结果，则直接入栈

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length,
    stack = [],
    _result = 0

  prices.push(-1)

  for (let i = 0; i < len + 1; i++) {
    while (stack.length && stack[stack.length - 1] >= prices[i]) {
      _result = Math.max(_result, stack[stack.length - 1] - stack[0])
      stack.pop()
    }
    stack.push(prices[i])
  }
  return _result
}
```
