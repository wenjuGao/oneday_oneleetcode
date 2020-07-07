---
title: 只出现一次的数字
tags:
  - 只出现一次的数字
sidebar: auto
---

### 只出现一次的数字

::: tip 难度
简单
:::

![img](http://qiniu.gaowenju.com/leecode/banner/21200609.jpg)

## [题目:](https://leetcode-cn.com/problems/single-number/solution/zhi-chu-xian-yi-ci-de-shu-zi-by-leetcode-solution)

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

### 说明

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

### 示例

- 示例 1

```
输入: [2,2,1]
输出: 1

```

- 示例 2

```
输入: [4,1,2,1,2]
输出: 4

```

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/21200609.png)

**使用动态哈希来记录遍历过程**

- 遍历数组把每个数组存到 map 中
- 已经存在的删除
- 没有的添加
- 循环到最后只剩一个不重复的数据了(哈希和 value 都可以 return)

通过 map.keys()或者 map.values()返回的遍历器得到结果
最后一次虽然是 for 循环，但是 map 的长度固定为 1

```javascript
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function (num) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.delete(nums[i])
    } else {
      map.set(nums[i], nums[i])
    }
  }
  for (let key of map.keys()) {
    return key
  }
}
```

**使用为运算符中和(消除)已经存在的值**

- 如上图两个相同的数组按位取异或返回 0
- 类似我们声明了一个数，遍历叠加数组，遇到相同的减掉，不同的叠加上来，最后得到的结果就是不重复的数据

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let _result = null
  for (let i = 0; i < nums.length; i++) {
    _result = _result ^ nums[i]
  }
  return _result
}
```

## [官方答案:](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/solution/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-by-leetcode-sol/)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let single = null
  for (let i = 0; i < nums.length; i++) {
    single ^= nums[i]
  }
  return single
}
```

### 高手在民间

- 分别与数组的第一位进行位异或运算，并实时更新数组的第一位
- 减少了一次声明返回值的运行空间

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  if (nums.length === 1) return nums[0]
  for (let i = 1; i < nums.length; i++) {
    nums[0] = nums[0] ^ nums[i]
  }
  return nums[0]
}
```
