---
title: 最长子串
tags:
  - 最长子串
  - 无重复字符的最长子串
sidebar: auto
---

### 无重复字符的最长子串

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-001.jpg)

## [题目:](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

### 示例

1. 示例 1

```
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

2. 示例 2

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

3. 示例 3

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-001.png)

### 截取比较

- 首先想到的是遍历字符串
- 逐个找到以每个字符串(开始索引 i)开始向后查找
- 遇到重复的字符(结束索引 end)记录查找长度(end-i+1)
- 重置开始索引到 i+1

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let end = -1,
    _result = 0
  for (let i = 0; i < s.length; i++) {
    while (end + 1 < s.length) {
      if (s.substring(i, end + 1).includes(s[end + 1])) {
        break
      } else {
        end++
      }
    }
    _result = Math.max(_result, end - i + 1)
  }
  return _result
}
```

---

### 优化

- 上面的方法是从字符串中截取判断知道截取到最大满足片段
- 字符串的截取 substring 和查询 includes，频繁对字符串操作，这部分可以优化下
- 除了对字符串的查询，我们可以存储已经出现的字母，之后的字母与其比较
- 带有查重属性的 js 对象包括：set，map，Array，Object...这样都可以通过哈希来标记重复

使用 map 优化上面逻辑：

- 下一次删除 map 中上一个起点就可以直接进行下一次查重

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let _result = 0,
    end = -1,
    map = new Map()
  for (let i = 0; i < s.length; i++) {
    while (end + 1 < s.length) {
      if (map.has(s[end + 1])) {
        map.delete(s[i])
        break
      } else {
        map.set(s[end + 1], true)
        end++
      }
    }
    _result = Math.max(_result, end - i + 1)
  }
  return _result
}
```

### 存储索引

（上面方法的 end，i 是截取字符串的双指针）

- 既然我们都已经可以循环存储字符串了，那如 map 中存放的是之前存储的不重复判断的数量
- 通过 map 的 key 判断字符是否重复
- 通过 map 的 value 存储字符长度
- 这样就不需要分别计算长度

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map(),
    max = 0
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i)
    }
    max = Math.max(max, j - i + 1)
    map.set(s[j], j)
  }
  return max
}
```

## [官方答案:](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/wu-zhong-fu-zi-fu-de-zui-chang-zi-chuan-by-leetc-2/)

### 滑动窗口

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 哈希集合，记录每个字符是否出现过
  let set = new Set()
  let len = s.length
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let end = -1,
    _result = 0
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      // 左指针向右移动一格，移除一个字符
      set.delete(s[i - 1])
    }
    while (end + 1 < n && !set.has(s[end + 1])) {
      // 不断地移动右指针
      set.add(s[end + 1])
      ++end
    }
    // 第 i 到 end 个字符是一个极长的无重复字符子串
    _result = Math.max(_result, end - i + 1)
  }
  return _result
}
```

## 其他解法

- 借助 indexOf 来替换内层的 while 循环来找到

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let index = 0,
    start = 0,
    _result = 0
  for (let end = 0; end < s.length; end++) {
    index = s.substring(start, end).indexOf(s[end])
    if (index !== -1) {
      start = start + index + 1
    }
    _result = Math.max(_result, end - start + 1)
  }
  return _result
}
```
