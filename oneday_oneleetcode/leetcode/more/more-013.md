---
title: 课程表 II
tags:
  - 课程表 II
sidebar: auto
---

### 课程表 II

::: tip 难度
中等
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-013.jpg)

## [题目:](https://leetcode-cn.com/problems/course-schedule-ii/)

现在你总共有 n 门课需要选，记为  0  到  n-1。

在选修某些课程之前需要一些先修课程。  例如，想要学习课程 0 ，你需要先完成课程  1 ，我们用一个匹配来表示他们: [0,1]

给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。

可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

### 示例

1. 示例 1

```
输入: 2, [[1,0]]
输出: [0,1]
解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1]
```

2. 示例 2

```
输入: 4, [[1,0],[2,0],[3,1],[3,2]]
输出: [0,1,2,3] or [0,2,1,3]
解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
     因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3]
```

### 说明

1. 输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。
2. 你可以假定输入的先决条件中没有重复的边。

### 提示

1. 这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
2. 拓扑排序也可以通过 BFS 完成。

## 抛砖引玉

![img](http://qiniu.gaowenju.com/leecode/more-013.png)

梳理下题目给出的信息：

- 参数：
  - numCourses 课程数
  - prerequisites 修课的依赖关系[a,b],修 b 之前需要先修 a（prerequisites 中所有元素均在 0 到 numCourses-1 之间）
- 返回：
  - 能修完全课程则返回一种修课顺序
  - 不能修完返回[]

声明一个 numCourses 长的数组，来重新存放课程之间的依赖关系：索引位的课程依赖的前置课程存到到其索引位置（可能是多个）
遍历课程，如果其有前置课程就遍历学习其前置课程：

- 如果遇到已经遍历过未修的课程说明前置课程的依赖关系形成了环（即多个课程的依赖关系是相互依赖不能找到满足条件的先修课程）
- 如果遇到已修课程则此已修课程作为该组课程的先修课程
- 最后如果课程全部均标记修完则说明找到满足要求的结果

### 深度优先搜索(DFS)

- edges：存放新依赖关系
- visited：标记访问状态：
  - 0：未修
  - 1：未修,且是在寻找依赖的前置课程
  - 2：已修
- hoop:是否成环

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  let edges = Array.from({ length: numCourses }, () => []),
    visited = Array(numCourses).fill(0),
    _result = Array(numCourses),
    hoop = false,
    index = numCourses - 1
  // 初始化依赖关系
  for (let i = 0; i < prerequisites.length; i++) {
    let [a, b] = prerequisites[i]
    edges[b].push(a)
  }
  // 开始修课，遇到成环就终止
  for (let i = 0; i < numCourses && !hoop; i++) {
    if (visited[i] == 0) dfs(i)
  }
  // 如果成环则不能完成所有课程
  if (hoop) return []

  function dfs(item) {
    // 标记：1. 寻找依赖
    visited[item] = 1
    // 遍历当前课程依赖课程
    for (let i = 0; i < edges[item].length; ++i) {
      let x = edges[item][i]
      // 前置课程是未修，则继续查找前置课程的前置课程...
      if (visited[x] == 0) {
        dfs(x)
        if (hoop) return
      } else if (visited[x] == 1) {
        hoop = true
        return
      }
    }
    // 标记已修
    visited[item] = 2
    // 先修课程满足则记录修课顺序
    _result[index--] = item
  }
  // 如果没有环返回结果
  return _result
}
```

### 深度优先搜索(BFS)

就每个课程来看：

- 其依赖的课程可在看做其入度
- 依赖其的课程可看做其出度

```javascript
var findOrder = function(numCourses, prerequisites) {
  let _result = [],
    indegree = new Array(numCourses).fill(0), // 入度
    outdegreeMap = new Map() // 出度

  // 初始化入度出度数据
  for (let i = 0; i < prerequisites.length; i++) {
    let [x, y] = prerequisites[i]
    indegree[x]++
    if (outdegreeMap.has(y)) {
      outdegreeMap.get(y).push(x)
    } else {
      outdegreeMap.set(y, [x])
    }
  }

  let queue = []
  // 将入度等于0的课程入列（无前置依赖的优先修）
  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) queue.push(i)
  }

  // 从被依赖的课程开始修
  while (queue.length) {
    let item = queue.shift()
    _result.push(item)
    if (outdegreeMap.get(item)) {
      let list = outdegreeMap.get(item)
      for (let i = 0; i < list.length; i++) {
        indegree[list[i]]--
        // 如果本轮修完课程无入度则可以选修
        if (indegree[list[i]] === 0) {
          queue.push(list[i])
        }
      }
    }
  }
  // 如果存在课程未被修则返回不能满足选修完
  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] > 0) return []
  }

  return _result
}
```
