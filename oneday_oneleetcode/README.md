---
home: true
heroImage: /logo.png
heroText: 一天一大lee
tagline: 每天一道leetcode，从零开始学习算法
actionText: 开始
actionLink: /leetcode/
features:
  - title: 简单易懂
    details: 尽量用自己的语言翻译算法中是的各种术语,二叉树、链表、堆栈等
  - title: 一起学习一起进步
    details: 坚持每天至少刷一道算法题，并且理解其他解法
  - title: 总结归纳
    details: 一月总结一次本月用到的算法，重新理解算法
footer: MIT Licensed | Copyright © 2020-present 前端小书童
---

博客: [小书童博客](http://gaowenju.com/)

每天的每日一题，写的题解会同步更新到公众号一天一大 lee 栏目
欢迎关注留言

![前端小书童](http://qiniu.gaowenju.com/wechat-new.png)

```javascript
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function(edges) {
  let len = edges.length,
    Disjoint = Array(len + 1).fill(-1),
    map = new Map(),
    conflict = -1,
    cycle = -1

  // 查询根节点
  function find_root(index) {
    let root = index
    while (Disjoint[root] != -1) {
      root = find(Disjoint[root])
    }
    return root
  }
  // 遍历有向图
  for (let i = 0; i < len; ++i) {
    let [x, y] = edges[i];
    if (map.has(y)) {
      conflict = i
    } else {
      map.set(y,x)
      if (find_root(x) == find_root(y)) {
        cycle = i
      } else {
        Disjoint[find_root(x)] = find_root(y)
      }
    }
  }
  if (conflict < 0) {
    return [edges[cycle][0], edges[cycle][1]]
  } else {
    let [x,y] = edges[conflict]
    if (cycle >= 0) {
      return [parent[y], y]
    } else {
      return [x,y]
    }
  }
}
```