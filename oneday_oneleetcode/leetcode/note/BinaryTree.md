---
title: 二叉树
tags:
  - 二叉树遍历
  - 二叉树
sidebar: auto
---

### 二叉树

### 中序遍历：

中序遍历的顺序是每次遍历左孩子，再遍历根节点，最后遍历右孩子。

```javascript
let _result = []
function dfs(root) {
  if (root == null) return
  dfs(root.left)
  _result.push(root.val)
  dfs(root.right)
}
```

### 后序遍历

后序遍历的顺序是每次遍历左孩子，再遍历右孩子，最后遍历根节点

```javascript
let _result = []
function dfs(root) {
  if (root == null) return
  dfs(root.left)
  dfs(root.right)
  _result.push(root.val)
}
```
