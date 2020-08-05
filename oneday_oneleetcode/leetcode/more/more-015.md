---
title: 打家劫舍
tags:
  - 打家劫舍
sidebar: auto
---

### 打家劫舍

::: tip 难度
简单
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-015.jpg)

## [题目:](https://leetcode-cn.com/problems/house-robber/)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

### 示例

1. 示例1
```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

2. 示例2
```
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

### 提示

1. 0 <= nums.length <= 100
2. 0 <= nums[i] <= 400

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-015.png)

- 一维的数组计算间隔元素相加就是奇偶索引位数据的相加
- 一次循环奇偶索引位数分别相加，返回较大的结果

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
let odd = 0,
    even - 0;
    for(let i = 0;i<nums.length;i++){
      if(i%2) {
        add+=nums[i]
      }else{
        even += nums[i]
      }
    }
    return Math.max(add,even)
};
```
