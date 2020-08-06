---
title: 打家劫舍 II
tags:
  - 打家劫舍 II
sidebar: auto
---

### 打家劫舍 II

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-016.jpg)

## [题目:](https://leetcode-cn.com/problems/house-robber-ii/)

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

### 示例

1. 示例1
```
输入: [2,3,2]
输出: 3
解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

2. 示例2
```
输入: [1,2,3,1]
输出: 4
解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-016.png)

**思路**

相较于[more-015: 打家劫舍 (难度:简单)](./more-015.md)多了一个限制条件首位字符算作相邻，
那么我们需要多做的就是知道上面题解中在什么条件下同时累加了首位和末尾，排除这种情况就好。

- 最简单的思路就是分别在数组就去掉首位数据计算求最大值

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length < 3) return Math.max(...nums, 0)

  // 去投去尾计算值
  let noStart = dfs(nums.slice(1)),
    noEnd = dfs(nums.slice(0, nums.length - 1))

  // 查询逻辑与打家劫舍 (难度:简单)一致
  function dfs(nums) {
    if (nums.length < 3) return Math.max(...nums, 0)
    let len = nums.length,
      dp = Array(len);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < len; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }
    return dp[len - 1]
  }

  return Math.max(noStart, noEnd)
};
```

另外一种思路，可以通过声明两个指针来限定累加的范围，最终返回0-len-2，与1-len-1的最大值


