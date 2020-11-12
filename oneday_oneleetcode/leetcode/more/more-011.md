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

![img](http://qiniu.gaowenju.com/leecode/banner/more-011.jpg)

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

![img](http://qiniu.gaowenju.com/leecode/more-011.png)

**思路**

- 记录 T 中每个字符及其出现的次数：map-key-num
- 声明两个指针 left，right 截取 S,（right-left >= t.length）
- 验证 left 到 right 中 字符种类包含 t 中的字符种类及每种的数量：
  - map-size 字符种类
  - map-value 字符数量

---

验证逻辑

- 初始 left，right 区间包含 0 个字符，map 为 T 的全映射
- left，right 交替向后移动
  - right 右移，left-right 区间扩大，新加入字符 x
    - x 在 t 中且，则匹配，map 记录待匹配的字符数减 1
    - 如果 x 在 t 中只出现一次，即减一后 map-value 等于 0，则记录已匹配种类加 1
  - left 右移(在 right 移动第一次满足条件后就执行)，移除字符 y
    - y 在 t 中，则待匹配字符加 1
    - 如果 y 在 t 中且待匹配(value>0),则已匹配种类减 1

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
    Rleft = -Number.MAX_VALUE, // 结果区间的left索引
    Rright = -1, // 结果区间的right索引
    type = 0, // 区间已匹配的字符种类数
    map = new Map()

  if (slen === 0 || tlen === 0 || slen < tlen) return ''

  // 使用map映射T中的字符及其出现的次数，给区间匹配
  for (let i of t) {
    map.set(i, map.has(i) ? map.get(i) + 1 : 1)
  }
  // 交替切换left-right在s中生产选区
  while (right < slen) {
    let Rstr = s.charAt(right), // 指针所在的字符
      Rvalue = map.get(Rstr) // 指针所在字符在t-map中的计算

    // 新加入的字符在t中，则待匹配的map对应字符数减1
    if (map.has(Rstr)) map.set(Rstr, --Rvalue)

    // 新加入字符匹配完后刚好一种字符完全匹配，则已匹配字符种类数加1
    if (map.has(Rstr) && Rvalue === 0) ++type

    // 已匹配字符种类等于map-size 所有种类均匹配完成
    while (type === map.size) {
      let Lstr = s.charAt(left),
        Lvalue = map.get(Lstr)

      // 如果新的区间比较小则使用新区间
      if (right - left < Rright - Rleft) {
        Rleft = left
        Rright = right
      }

      // 丢弃的字符在t中则待匹配的字符加1
      if (map.has(Lstr)) map.set(Lstr, ++Lvalue)

      // 如果移动丢弃的字符在t中，且该字符数量不为0，则已匹配字符之类减1
      if (map.has(Lstr) && Lvalue > 0) --type

      // 做区间向右移动
      left++
    }

    // 右区间向右移动
    right++
  }

  return s.substring(Rleft, Rright + 1)
}
```
