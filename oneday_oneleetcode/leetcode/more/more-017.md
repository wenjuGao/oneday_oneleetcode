---
title: 全排列
tags:
  - 全排列
  - 回溯
  - 回溯递归
  - 回溯算法
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

### 回溯-记录选择

对一个数组的元素重新进行排列：

- 对任意一个元素进行选择-回溯操作
- 选择后标记已被选择
- 下一个元素就从未被选择的元素中进行选择-回溯操作

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let _result = [],
    inList = new Map()
  function helper(item) {
    if (item.length === nums.length) {
      _result.push([...item])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (inList.has(nums[i])) continue
      item.push(nums[i])
      inList.set(nums[i], true)
      helper(item)
      // 回溯-释放上面被在该位置选择的元素尝试在该位置选择其他元素
      item.pop()
      inList.delete(nums[i])
    }
  }
  if (nums.length < 2) return nums.length === 1 ? [nums] : _result
  helper([])
  return _result
}
```

### 回溯-位置交换

- 上面选择下一个元素时是记录已被选择的从未被选择的元素中逐个枚举
- 换种思路，可以不被讲元素从原数组中出去，在枚举可能的排列是直接在原数组中操作
- 回溯时回溯上次交换的位置

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let _result = []
  if (nums.length < 2) return nums.length === 1 ? [nums] : _result
  function helper(index) {
    if (index === nums.length) {
      _result.push([...nums])
      return
    }
    for (let i = index; i < nums.length; i++) {
      // 逐个与当前索引位元素交换
      swap(nums, i, index)
      // 进行后续交换
      helper(index + 1)
      // 回溯上一次交换，让下一个位置的交换在上一次未交换的基础上开始
      swap(nums, i, index)
    }
  }
  // 替换指定位置两个数
  function swap(a, i, j) {
    var tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  helper(0)
  return _result
}
```
