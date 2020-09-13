---
title: 单词搜索 II
tags:
  - 单词搜索 II
sidebar: auto
---

### 单词搜索 II

::: tip 难度
困难
:::

![more-022](http://qiniu.gaowenju.com/leecode/banner/more-022.jpg)

## [题目:](https://leetcode-cn.com/problems/word-search-ii/)

给定一个二维网格 board 和一个字典中的单词列表 words，找出所有同时在二维网格和字典中出现的单词。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。

### 示例

```
输入: 
words = ["oath","pea","eat","rain"] and board =
[
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]

输出: ["eat","oath"]
```

**说明：**你可以假设所有输入都由小写字母 a-z 组成。

### 提示

1. 你需要优化回溯算法以通过更大数据量的测试。你能否早点停止回溯？
2. 如果当前单词不存在于所有单词的前缀中，则可以立即停止回溯。什么样的数据结构可以有效地执行这样的操作？散列表是否可行？为什么？ 前缀树如何？如果你想学习如何实现一个基本的前缀树，请先查看这个问题： 实现Trie（前缀树）。


## 抛砖引玉

![抛砖引玉](http://qiniu.gaowenju.com/leecode/20200913.png)

**思路**

前面做过：
[day-13: 单词搜索 (难度:中等)](../202009/20200913.md)
发现本题处理单个单词变成了多个单词（字典words）,其他逻辑都没有发生变化，那么偷懒下，遍历words，照搬单词搜索的逻辑校验是否存在就应该可以得到结果。

这样就解决了一个困难的题目！？应该会超时吧，似乎结果没有那么悲观，险过：

![抛砖引玉](http://qiniu.gaowenju.com/leecode/more-022-more.png)

```javascript
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
 let _list = [];
  for (let i = 0; i < words.length; ++i) {
    if (exist(board, words[i])){
      _list.push(words[i])
    }
  }
  return _list

  function exist(board, word) {
    let dir = [[0, 1], [0, -1], [1, 0], [-1, 0]],
      len = word.length,
      m = board.length,
      n = board[0] ? board[0].length : 0,
      visited = new Array(m);
    // 初始化记录选择矩阵
    for (let i = 0; i < m; ++i) {
      visited[i] = Array(n).fill(false);
    }

    // 枚举起点
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === word[0] && helper(0, [i, j])) {
          return true
        }
      }
    }

    // 匹配字符指针 上一个匹配上的位置坐标
    function helper(index, [x, y]) {
      let _result = false;
      if (index === len - 1) return true;
      // 上一个匹配坐标标记已选
      visited[x][y] = true

      for (let [dx, dy] of dir) {
        let nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
          if (!visited[nx][ny]) {
            if (board[nx][ny] === word[index + 1] && helper(index + 1, [nx, ny])) {
              result = true;
              break;
            }
          }
        }
      }
      // 上一个匹配坐标起，枚举匹配一种组合完成恢复选择状态（可能其他组合需要使用改坐标完成匹配）
      visited[x][y] = false;
      return _result;
    }
    // 上面逻辑为查找到满足条件的组合，返回false
    return false
  }
};
```

