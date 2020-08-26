---
title: 实现 strStr()
tags:
  - 实现 strStr()
sidebar: auto
---

### 实现 strStr()

::: tip 难度
简单
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-019.jpg)

## [题目:](https://leetcode-cn.com/problems/implement-strstr/)

实现  strStr()  函数。

给定一个  haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从 0 开始)。如果不存在，则返回   -1。

### 示例

1. 示例 1

```
输入: haystack = "hello", needle = "ll"
输出: 2
```

2. 示例 2

```
输入: haystack = "aaaaa", needle = "bba"
输出: -1
```

### 提示

- 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
- 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

## 抛砖引玉

![抛砖引玉](http://qiniu.gaowenju.com/leecode/more-019.png)

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {}
```
