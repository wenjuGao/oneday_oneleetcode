---
title: 实现 Trie (前缀树)
tags:
  - 实现 Trie (前缀树)
sidebar: auto
---

### 实现 Trie (前缀树)

::: tip 难度
中等
:::

![more-023](http://qiniu.gaowenju.com/leecode/banner/more-023.jpg)

## [题目:](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

### 示例

```
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");   
trie.search("app");     // 返回 true
```

### 说明：

1. 你可以假设所有的输入都是由小写字母 a-z 构成的。
2. 保证所有输入均为非空字符串。


前缀树是一种树数据结构，用于检索字符串数据集中的键:
- 自动补全
- 拼写检查
- IP 路由 (最长前缀匹配)
- T9 (九宫格) 打字预测
-  单词游戏



```javascript
function TrieNode() {
  this.next = {};
  this.isEnd = false;
};
/**
 * Initialize your data structure here.
 */
var Trie = function () {
  this.root = new TrieNode();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  if (!word) return false;

  let node = this.root;
  for (let i = 0; i < word.length; ++i) {
    if (!node.next[word[i]]) {
      node.next[word[i]] = new TrieNode();
    }
    node = node.next[word[i]];
  }
  node.isEnd = true;
  return true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  if (!word) return false;

  let node = this.root;
  for (let i = 0; i < word.length; ++i) {
    if (node.next[word[i]]) {
      node = node.next[word[i]];
    } else {
      return false;
    }
  }
  return node.isEnd;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  if (!prefix) return true;

  let node = this.root;
  for (let i = 0; i < prefix.length; ++i) {
    if (node.next[prefix[i]]) {
      node = node.next[prefix[i]];
    } else {
      return false;
    }
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```