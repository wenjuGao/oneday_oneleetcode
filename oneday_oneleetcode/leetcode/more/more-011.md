---
title: 最小覆盖子串
tags:
  - 最小覆盖子串
  - 滑动窗口
sidebar: auto
---

### 最小覆盖子串

::: tip 难度
困难
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-005.jpg)

## [题目:](https://leetcode-cn.com/problems/minimum-window-substring/)

给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字符的最小子串。

### 示例

```
输入: S = "ADOBECODEBANC", T = "ABC"
输出: "BANC"
```

### 说明

- 如果 S 中不存这样的子串，则返回空字符串 ""
- 如果 S 中存在这样的子串，我们保证它是唯一的答案

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-005.png)

**思路**

- 记录 T 中每个字符及其出现的次数：map-key-num
- 声明两个指针 left，right 截取 S,（right-left >= t.length）
- 验证 left 到 right 中 map 的 key 均出现且每个 key 对应的 num 不小于 map 的 num

---

验证逻辑

- 初始 left，right 区间包含 0 个字符，map 为 T 的全映射
- left，right 交替向后移动，先移动做指针
  - 出现对应字符到 map 中对应 key 的计数减一
  - 且记录 map 中出现不同字符数被匹配完的次数，当次数 num 等于 map.size 是则说明一个符合条件的选区形成开始移动指针

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let left = 0,
    right = 0,
    slen = s.length,
    tlen = t.length,
    Rleft = Number.MIN_VALUE, // 结果区间的left索引
    Rright = Number.MAX_VALUE, // 结果区间的right索引
    type = 0, // 区间已匹配的字符种类数
    map = new Map()

  if (slen === 0 || tlen === 0 || slen < tlen) return ''

  // 使用map映射T中的字符及其出现的次数，给区间匹配
  for (let i of t) {
    map.set(i, map.get(i) || 1)
  }

  // 交替切换left-right在s中生产选区
  while (right < slen) {
    let Rstr = s.charAt(right), // 指针所在的字符
      Rvalue = map.get(Rstr)

    // 匹配到T中该指针所在位置的字符，已匹配则从映射对象中减少一个
    if (Rvalue !== undefined) map.set(Rstr, Rvalue--)

    // 一种类型字符匹配完成
    if (Rvalue === 0) type++

    // 所有种类均匹配完成
    while (type === map.size) {
      let Lstr = s.charAt(left)
      LValue = map.get(Lstr)

      // 如果新的区间比较小则使用新区间
      if (Rright - Rleft > right - left) {
        Rleft = left
        right = right
      }

      if (LValue !== undefined) map.set(Lstr, LValue++)

      if (LValue > 0) type--

      left++
    }

    right++
  }

  return s.substring(Rleft, Rright)
}
```
