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
  - numCourses课程数
  - prerequisites修课的依赖关系[a,b],修b之前需要先修a（prerequisites中所有元素均在0到numCourses-1之间）
- 返回：
  - 能修完全课程则返回一种修课顺序
  - 不能修完返回[]



### 深度优先搜索(DFS)

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  // 存储有向图
  let edges = Array.from({ length: numCourses }, () => []),
  // 标记每个节点的状态：0=未搜索，1=搜索中，2=已完成
    visited = Array(numCourses).fill(0),
    _result = Array(numCourses),
    valid = true,
    index = numCourses - 1;
  for (let i = 0; i < prerequisites.length;i++) {
      let [a,b] = prerequisites[i];
      edges[b].push(a);
  }
  // 每次挑选一个「未搜索」的节点，开始进行深度优先搜索
  for (let i = 0; i < numCourses && valid; i++) {
      if (visited[i] == 0) dfs(i)
  }

  if (!valid) return [];

  function dfs(u){
    // 将节点标记为「搜索中」
    visited[u] = 1;
    // 搜索其相邻节点
    // 只要发现有环，立刻停止搜索
    for (let i = 0 ; i< edges[u].length;++i) {
        let v = edges[u][i];
        // 如果「未搜索」那么搜索相邻节点
        if (visited[v] == 0) {
            dfs(v);
            if (!valid) return
        }
        // 如果「搜索中」说明找到了环
        else if (visited[v] == 1) {
            valid = false;
            return;
        }
    }
    // 将节点标记为「已完成」
    visited[u] = 2;
    // 将节点入栈
    _result[index--] = u;
  }
  // 如果没有环，那么就有拓扑排序
  return _result;
}
```


```javascript
var findOrder = function(numCourses, prerequisites) {
    function dfs(i){
        if(state[i] == 1) return false;
        else if(state[i] == 0){
            state[i] = 1;
            let node = graph[i];
            for(let j = 0; node != undefined && j < node.length; j++){
                if(!dfs(node[j])) return false;
            }
            state[i] = 2;
            res.push(i);
        }
        return true;
    }

    let res = [],
        graph = {},
        state = new Array(numCourses).fill(0);
    for(let i = 0; i < prerequisites.length; i++){
        if(graph[prerequisites[i][1]] == undefined) graph[prerequisites[i][1]] = [];
        graph[prerequisites[i][1]].push(prerequisites[i][0]);
    }
    for(let i = 0; i < numCourses; i++){
        if(state[i] == 0){
            dfs(i);
        }  
    }
    return state.filter((a)=> a != 2).length != 0 ? [] : res.reverse();
};
```

### 深度优先搜索(BFS)


```javascript
var findOrder = function (numCourses, prerequisites) {
  let indegree = new Array(numCourses).fill(0) // 入度表
  let outdegreeMap = {}

  for (let i = 0; i < prerequisites.length; i++) {
    // 更新入度表
    indegree[prerequisites[i][0]]++
    // 更新出度表
    if (outdegreeMap[prerequisites[i][1]]) { // 出度表已存在
      outdegreeMap[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
      outdegreeMap[prerequisites[i][1]] = [prerequisites[i][0]]
    }
  }

  let queue = []
  for (let i = 0; i < indegree.length; i++) {
    // 将入度等于0的课程入列
    if (indegree[i] === 0) queue.push(i)
  }

  const result = []
  while (queue.length) {
    // 出队列
    let course = queue.shift()
    result.push(course)
    if (outdegreeMap[course]) { // 如果存在下游课程
      for (let i = 0; i < outdegreeMap[course].length; i++) {
        // 更新入度表
        indegree[outdegreeMap[course][i]]--
        if (indegree[outdegreeMap[course][i]] === 0) {
          queue.push(outdegreeMap[course][i])
        }
      }
    }
  }

  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] > 0) return []
  }

  return result
};
```


```javascript
var findOrder = (numCourses, prerequisites) => {
  let inDegree = new Array(numCourses).fill(0) // 初始化入度数组
  let graph = {} // 哈希表
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++ // 构建入度数组
    if (graph[prerequisites[i][1]]) { // 构建哈希表
      graph[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
      let list = []
      list.push(prerequisites[i][0])
      graph[prerequisites[i][1]] = list
    }
  }
  let res = [] // 结果数组
  let queue = [] // 存放 入度为0的课
  for (let i = 0; i < numCourses; i++) { // 起初推入所有入度为0的课
    if (inDegree[i] === 0) queue.push(i)
  }
  while (queue.length) { // 没有了入度为0的课，没课可选，结束循环
    let cur = queue.shift() // 出栈，代表选这门课
    res.push(cur) // 推入结果数组
    let toEnQueue = graph[cur] // 查看哈希表，获取对应的后续课程
    if (toEnQueue && toEnQueue.length) { // 确保有后续课程
      for (let i = 0; i < toEnQueue.length; i++) { // 遍历后续课程
        inDegree[toEnQueue[i]]-- // 将后续课程的入度 -1
        if (inDegree[toEnQueue[i]] == 0) { // 一旦减到0，让该课入列
          queue.push(toEnQueue[i])
        }
      }
    }
  }
  return res.length === numCourses ? res : [] // 选齐了就返回res，否则返回[]
};
```
