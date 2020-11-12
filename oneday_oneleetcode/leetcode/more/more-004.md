---
title: 灌溉花园的最少水龙头数目
tags:
  - 灌溉花园
  - 灌溉花园的最少水龙头数目
sidebar: auto
---

### 灌溉花园

::: tip 难度
困难
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-004.jpg)

## [题目:](https://leetcode-cn.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/)

在 x 轴上有一个一维的花园。花园长度为  n，从点  0  开始，到点  n  结束。

花园里总共有  n + 1 个水龙头，分别位于  [0, 1, ..., n] 。

给你一个整数  n  和一个长度为  n + 1 的整数数组  ranges ，其中  ranges[i] （下标从 0 开始）表示：如果打开点  i  处的水龙头，可以灌溉的区域为  [i -  ranges[i], i + ranges[i]] 。

请你返回可以灌溉整个花园的   最少水龙头数目  。如果花园始终存在无法灌溉到的地方，请你返回  -1 。

### 示例

![img](http://qiniu.gaowenju.com/leecode/other/more-004-q.jpg)

- 示例 1：

```
输入：n = 5, ranges = [3,4,1,1,0,0]
输出：1
解释：
点 0 处的水龙头可以灌溉区间 [-3,3]
点 1 处的水龙头可以灌溉区间 [-3,5]
点 2 处的水龙头可以灌溉区间 [1,3]
点 3 处的水龙头可以灌溉区间 [2,4]
点 4 处的水龙头可以灌溉区间 [4,4]
点 5 处的水龙头可以灌溉区间 [5,5]
只需要打开点 1 处的水龙头即可灌溉整个花园 [0,5] 。
```

- 示例 2：

```
输入：n = 3, ranges = [0,0,0,0]
输出：-1
解释：即使打开所有水龙头，你也无法灌溉整个花园。
```

- 示例 3：

```
输入：n = 7, ranges = [1,2,1,0,2,1,0,1]
输出：3
```

- 示例 4：

```
输入：n = 8, ranges = [4,0,0,0,0,0,0,0,4]
输出：2
```

- 示例 5：

```
输入：n = 8, ranges = [4,0,0,0,4,0,0,0,4]
输出：1
```

### 提示

1. 1 <= n <= $10^4$
2. ranges.length == n + 1
3. 0 <= ranges[i] <= 100

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-004.png)

看明白题目看了好久....

看下例子说明下逻辑吧

- 示例 1

```
[0,7]
[
  1,   0 - 1 到 0 + 1  -> [-1,1]
  2,   1 - 2 到 1 + 2  -> [-1,3]  开
  1,   2 - 1 到 2 + 1  -> [1,3]
  0,   3 - 0 到 3 + 0  -> [3,3]
  2,   4 - 2 到 4 + 2  -> [2,6]   开
  1,   5 - 1 到 5 + 1  -> [4,6]
  0,   6 - 0 到 6 + 0  -> [6,6]
  1    7 - 1 到 7 + 1  -> [6,8]   开
]
```

每个水龙头覆盖的面积是固定的，要求最少子集覆盖目标集合
可见：[-1,3]、[2,6]、[6,8] 覆盖了[-1,8]满足覆盖[0,7]
则打开索引：1,4,7 位置的水龙头

- 示例 2

```
[0,8]
[
  4,   0 - 4 到 0 + 4  -> [-4,4] 开
  0,   1 - 0 到 1 + 0  -> [1,1]
  0,   2 - 0 到 2 + 0  -> [2,2]
  0,   3 - 0 到 3 + 0  -> [3,3]
  0,   4 - 0 到 4 + 0  -> [4,4]
  0,   5 - 0 到 5 + 0  -> [5,5]
  0,   6 - 0 到 6 + 0  -> [6,6]
  0,   7 - 0 到 7 + 0  -> [7,7]
  4    8 - 4 到 8 + 4  -> [4,12] 开
]
```

可见：[-4,4]、[4,12]覆盖了[-4,12]满足覆盖[0,8]
则打开索引：0,8 位置的水龙头

- 示例 3

```
[0,8]
[
  4,   0 - 4 到 0 + 4  -> [-4,4]
  0,   1 - 0 到 1 + 0  -> [1,1]
  0,   2 - 0 到 2 + 0  -> [2,2]
  0,   3 - 0 到 3 + 0  -> [3,3]
  4,   4 - 4 到 4 + 4  -> [0,8] 开
  0,   5 - 0 到 5 + 0  -> [5,5]
  0,   6 - 0 到 6 + 0  -> [6,6]
  0,   7 - 0 到 7 + 0  -> [7,7]
  4    8 - 4 到 8 + 4  -> [4,12]
]
```

可见：[0,8]满足覆盖[0,8]
则打开索引：4 位置的水龙头

- 声明一个长 n 的数组 dp 记录覆盖到这个点的水龙头最远覆盖到了哪里
- 最近 left，最远 right
- 遍历 dp，如果包含 0 则说明有点不能被覆盖到
- 遍历顺序:dp[0] -> dp[dp[0]] ... 知道出现大于等于 n
  - dp[0]之后开启的为，覆盖 dp[0]的点的边界下一个点

如示例 2:
dp = [4, 4, 4, 4, 8, 8, 8, 8]
存在覆盖 0-4 位置的水龙头，开启后直接去查询第 5 个水龙头即 dp[4],发现其覆盖到了 8 则返回

```javascript
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  let dp = Array(n).fill(0),
    _result = 0
  for (let i = 0; i < ranges.length; i++) {
    let left = Math.max(i - ranges[i], 0)
    let right = Math.min(i + ranges[i], n)
    for (let j = left; j < right; j++) {
      dp[j] = Math.max(dp[j], right)
    }
  }
  let max = 0
  while (max < n) {
    if (dp[max] == 0) return -1
    max = dp[max]
    _result++
  }
  return _result
}
```

::: tip 总结
一个点代表一个范围，遍历是大范围取代小范围，最后用大范围翻盖目标范围
需要的范围数就是结果
:::

## [官方答案](https://leetcode-cn.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/solution/guan-gai-hua-yuan-de-zui-shao-shui-long-tou-shu-3/)

### 动态规划

```javascript
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  let len = ranges.length,
    prev = []
  // 声明一个长n的数组，元素用索引递增，标识当前水龙头起点
  for (let i = 0; i < n + 1; i++) {
    prev[i] = i
  }
  for (let i = 0; i < n + 1; i++) {
    // 覆盖范围最小值
    let left = Math.max(i - ranges[i], 0)
    // 覆盖范围最大值
    let right = Math.min(i + ranges[i], n)
    // 记录区间，最大值做索引 最小值做值
    prev[right] = Math.min(prev[right], left)
  }
  let _result = 0,
    BIG = Number.MAX_VALUE,
    dp = [0, ...Array(n).fill(BIG)]

  for (let i = 1; i < n + 1; i++) {
    for (let j = prev[i]; j < i; j++) {
      if (dp[j] !== BIG) {
        dp[i] = Math.min(dp[i], dp[j] + 1)
      }
    }
  }
  return dp[n] === BIG ? -1 : dp[n]
}
```

### 贪心算法

```javascript
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  let len = ranges.length,
    prev = []
  for (let i = 0; i < n + 1; i++) {
    prev[i] = i
  }
  for (let i = 0; i < n + 1; i++) {
    let left = Math.max(i - ranges[i], 0)
    let right = Math.min(i + ranges[i], n)
    prev[right] = Math.min(prev[right], left)
  }
  let _result = 0,
    middle = n,
    BIG = Number.MAX_VALUE
  for (let i = n; i > 0; i--) {
    BIG = Math.min(BIG, prev[i])
    if (i === middle) {
      if (BIG >= i) return -1
      middle = BIG
      _result++
    }
  }
  return _result
}
```

### 高手在民间

```javascript
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  for (let i = 0; i < ranges.length; ++i) {
    let left = i - ranges[i] > 0 ? i - ranges[i] : 0
    let right = i + ranges[i] < n ? i + ranges[i] : n
    right > ranges[left] && (ranges[left] = right)
  }
  let _result = 1
  let item = (next = ranges[0])
  for (let i = 1; i < ranges.length; ++i) {
    if (i > next) return -1
    if (i > item) {
      item = next
      _result++
    }
    next = Math.max(next, ranges[i])
  }
  return _result
}
```
