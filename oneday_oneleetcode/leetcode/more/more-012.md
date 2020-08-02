---
title: 找出数组游戏的赢家
tags:
  - 找出数组游戏的赢家
sidebar: auto
---

### 找出数组游戏的赢家

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-012.jpg)

## [题目:](https://leetcode-cn.com/problems/find-the-winner-of-an-array-game/)

给你一个由 不同 整数组成的整数数组 arr 和一个整数 k 。

每回合游戏都在数组的前两个元素（即 arr[0] 和 arr[1] ）之间进行。
比较 arr[0] 与 arr[1] 的大小，较大的整数将会取得这一回合的胜利并保留在位置 0 ，较小的整数移至数组的末尾。
当一个整数赢得 k 个连续回合时，游戏结束，该整数就是比赛的 赢家 。

返回赢得比赛的整数。

题目数据 保证 游戏存在赢家。


### 示例

1. 示例1

**输入：**arr = [2,1,3,5,4,6,7], k = 2
**输出：**5
**解释：**一起看一下本场游戏每回合的情况：
![img](http://qiniu.gaowenju.com/leecode/banner/more-012-more.jpg)
因此将进行 4 回合比赛，其中 5 是赢家，因为它连胜 2 回合。

2. 示例2
```
输入：arr = [3,2,1], k = 10
输出：3
解释：3 将会在前 10 个回合中连续获胜。
```

3. 示例3
```
输入：arr = [1,9,8,2,3,7,6,4,5], k = 7
输出：9
```

4. 示例4
```
输入：arr = [1,11,22,33,44,55,66,77,88,99], k = 1000000000
输出：99
```

### 提示

- 2 <= arr.length <= $10^5$
- 1 <= arr[i] <= $10^6$
- arr 所含的整数 各不相同
- 1 <= k <= $10^9$

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-012.png)

**思路**

- 当k大于arr长度时则说明所有的元素都至少参与了一次比较，则直接返回最大值
- 当k小于arr长度时
  - 默认取第一个元素最大
  - 逐位向后比较：遇到比其小的元素，计数+1
  - 遇到比其大的元素，计算归1（本次切换最大值比较也算一个回合），继续向后比较
  - 大计算大于等于k是则比赛结束返回此时记录的最大值


```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var getWinner = function(arr, k) {
  let _result = arr[0],
      num = 0,
      len = arr.length;

  if (k >= len) return Math.max(...arr)

  for (let i = 1; i < len; i++) {
      if (arr[i] < _result) {
          num++;
      } else {
          if (num >= k) return _result;
          num = 1;
          _result = arr[i];
      }
  }
  return _result;
};
```
