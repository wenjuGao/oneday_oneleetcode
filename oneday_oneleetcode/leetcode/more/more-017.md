---
title: 全排列
tags:
  - 全排列
sidebar: auto
---

### 全排列

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-017.jpg)

## [题目:](https://leetcode-cn.com/problems/permutations/)

给定一个 没有重复 数字的序列，返回其所有可能的全排列。

### 示例

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-017.png)

**思路**

相较于[more-015: 打家劫舍 (难度:简单)](./more-015.md)多了一个限制条件首位字符算作相邻，
那么我们需要多做的就是知道上面题解中在什么条件下同时累加了首位和末尾，排除这种情况就好。

- 最简单的思路就是分别在数组就去掉首位数据计算求最大值

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {

};
```


