---
title: 分割数组
tags:
  - 分割数组
sidebar: auto
---

### 分割数组

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-003.jpg)

## [题目:](https://leetcode-cn.com/problems/partition-array-into-disjoint-intervals)

给定一个数组  A，将其划分为两个不相交（没有公共元素）的连续子数组  left  和  right，  使得：

- left  中的每个元素都小于或等于  right  中的每个元素。
- left 和  right  都是非空的。
- left  与  right  的长度差要尽可能小。

在完成这样的分组后返回  left  的长度。可以保证存在这样的划分方法。

### 示例

- 示例 1

```
输入：[5,0,3,8,6]
输出：3
解释：left = [5,0,3]，right = [8,6]

```

- 示例 2

```
输入：[1,1,1,0,6,12]
输出：4
解释：left = [1,1,1,0]，right = [6,12]

```

### 提示

1. 2 <= A.length <= 30000
2. 0 <= A[i] <= 10^6
3. 可以保证至少有一种方法能够按题目所描述的那样对 A 进行划分。

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-003.png)

```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var partitionDisjoint = function (A) {}
```

## [官方答案](https://leetcode-cn.com/problems/partition-array-into-disjoint-intervals/solution/fen-ge-shu-zu-by-leetcode)

- 辅助数组

不检验 all(L <= R for L in left for R in right)，而是检验 max(left) <= min(right)。
找出对于所有子集 left = A[:1], left = A[:2], left = A[:3], ... 的最大值 max(left)，
也就是用 maxleft[i] 记录子集 A[:i] 的最大值。
两两之间是相互关联的：max(A[:4]) = max(max(A[:3]), A[3]) 所以有 maxleft[4] = max(maxleft[3], A[3])。

同理，所有可能的 right 子集最小值 min(right) 也可以在线性时间内获得。

最后只需要快速扫描一遍 max(left) 和 min(right)，答案非常明显。

```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var partitionDisjoint = function (A) {
  var N = A.length
  var maxleft = []
  var minright = []

  var m = A[0]
  for (var i = 0; i < N; ++i) {
    m = Math.max(m, A[i])
    maxleft[i] = m
  }

  m = A[N - 1]
  for (var i = N - 1; i >= 0; --i) {
    m = Math.min(m, A[i])
    minright[i] = m
  }

  for (var i = 1; i < N; ++i) if (maxleft[i - 1] <= minright[i]) return i
}
```

### 高手在民间

1. 从左到右遍历
2. \_result 记录位置，mmax 记录左边的最大值，acmax 记录遍历过的最大值
3. 如果遍历的数都是比 mmax 大，则继续循环，发现存在比 mmax 小得，则 mmax = acmax，使得左边的最大值等于遍历过的最大值

```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var partitionDisjoint = function (A) {
  var _result = 0,
    mmax = A[0],
    acmax = A[0]
  for (var i = 1; i < A.length; i++) {
    acmax = Math.max(acmax, A[i])
    if (A[i] >= mmax) continue
    _result = i
    mmax = acmax
  }
  return _result + 1
}
```
