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

1. 示例 1

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

2. 示例 2

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

- 一维的数组计算间隔元素相加,间隔元素数大于 0
- 任选一个元素，对其就有两种选择，设其前置已累加结果为 y：
  - 前面累计的和的最后元素与其相邻不能计算，则其结果保持为：x
  - 前面累计的和的最后元素与其不相邻能计算，则其结果保持为：y+nums[i]
  - 累计到 i 是结果为：Math.max(x,y+nums[i]);

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // 特殊情况，当数组长度小于3时，返回所有元素中最大的元素
  if (nums.length < 3) return Math.max(...nums, 0)
  let len = nums.length,
    x = nums[0],
    y = Math.max(nums[1], nums[0])

  for (let i = 2; i < len; i++) {
    let perv = y
    // 累加到i位置（不一定包含i）的最大结果
    y = Math.max(x + nums[i], y)
    // 不包含i元素的最大结果
    x = perv
  }
  return y
}
```

### 动态规划

上面解法抽象前置点为了x，y两个，更加直观的可以针对任意一个元素记录数组从0到其的最终结果即：
- 对于i，dp[i],表示0-i间隔累加的最大值
- i增加是其的结果等于有两种情况：
  - 其计入累加则i-1一定没有计算,dp[i] = dp[i-2]+nums[i]
  - 没有计算，则结果应该和上一次一样，dp[i] = dp[i-1]
- 两次取最大值

---

数据推导规则：
- i = 0，dp[0] = Math.max(nums[0],0)
- i = 1，dp[1] = Math.max(nums[0],nums[1])
- i = 2，dp[2] = Math.max(nums[0]+nums[2],nums[1])
- i = 3，dp[3] = Math.max(nums[0]+nums[2],nums[1]+nums[3],nums[0]+nums[3])
- ...

- 可以发现dp[0]参与到dp[1]的计算中时：dp[1] = Math.max(dp[0],nums[1])
- 可以发现dp[1]参与到dp[2]的计算中时：
  - dp[0] = nums[0]
  - nums[1] > nums[0] -> dp[1] = nums[1]
  - nums[1] < nums[0] -> dp[1] = nums[0]
  - dp[2] = Math.max(dp[0]+nums[2],dp[1])
- 可以发现dp[2]参与到dp[3]的计算中时：
  - nums[1] > nums[0]+nums[2] -> dp[1]+nums[3] > dp[2]
  - nums[1] < nums[0]+nums[2] -> dp[2] = nums[0]+nums[2]
  - dp[3] = Math.max(dp[1]+nums[3],dp[2])

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // 特殊情况，当数组长度小于3时，返回所有元素中最大的元素
  if (nums.length < 3) return Math.max(...nums, 0)
  let len = nums.length,
    dp = Array(len);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0],nums[1]);

  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i-2]+nums[i],dp[i-1]);
  }
  return dp[len-1]
}
```