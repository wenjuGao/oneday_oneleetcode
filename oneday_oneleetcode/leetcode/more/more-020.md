---
title: 破解保险箱
tags:
  - 破解保险箱
sidebar: auto
---

### 破解保险箱

::: tip 难度
困难
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-020.jpg)

## [题目:](https://leetcode-cn.com/problems/cracking-the-safe/)

有一个需要密码才能打开的保险箱。密码是  n 位数, 密码的每一位是  k  位序列  0, 1, ..., k-1  中的一个 。

你可以随意输入密码，保险箱会自动记住最后  n  位输入，如果匹配，则能够打开保险箱。

举个例子，假设密码是  "345"，你可以输入  "012345"  来打开它，只是你输入了 6  个字符.

请返回一个能打开保险箱的最短字符串。

### 示例

1. 示例 1

```
输入: n = 1, k = 2
输出: "01"
说明: "10"也可以打开保险箱。
```

2. 示例 2

```
输入: n = 2, k = 2
输出: "00110"
说明: "01100", "10011", "11001" 也能打开保险箱。
```

### 提示

1. n 的范围是 [1, 4]。
2. k 的范围是 [1, 10]。
3. $k^n$ 最大可能为 4096。

## 抛砖引玉

![抛砖引玉](http://qiniu.gaowenju.com/leecode/more-020.png)

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var crackSafe = function(n, k) {}
```
