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
    uf = Array(len + 1),
    parent = Array(len + 1),
    conflict = -1,
    cycle = -1

  for (let i = 0; i <= len; ++i) {
    if (i < len) uf[i] = i
    if (i > 0) parent[i] = i
  }

  function find(index) {
    if (uf[index] != index) {
      uf[index] = find(uf[index])
    }
    return uf[index]
  }

  for (let i = 0; i < len; ++i) {
    let [x, y] = edges[i]
    if (parent[x] != y) {
      conflict = i
    } else {
      parent[y] = x
      if (find(x) == find(y)) {
        cycle = i
      } else {
        uf[find(x)] = find(y)
      }
    }
  }
  if (conflict < 0) {
    return [edges[cycle][0], edges[cycle][1]]
  } else {
    let conflictEdge = edges[conflict]
    if (cycle >= 0) {
      return [parent[conflictEdge[1]], conflictEdge[1]]
    } else {
      return [conflictEdge[0], conflictEdge[1]]
    }
  }
}
```

```java
import java.util.Arrays;

public class Solution {

    public int[] findRedundantDirectedConnection(int[][] edges) {
        // 边的条数（在这个问题里等于结点个数）
        int len = edges.length;
        // 步骤 1：预处理入度数组（记录指向某个结点的边的条数）
        int[] inDegree = new int[len + 1];
        for (int[] edge : edges) {
            inDegree[edge[1]]++;
        }

        // 步骤 2：先尝试删除构成入度为 2 的边，看看是否形成环
        for (int i = len - 1; i >= 0; i--) {
            if (inDegree[edges[i][1]] == 2) {
                // 如果不构成环，这条边就是要去掉的那条边
                if (!judgeCircle(edges, len, i)) {
                    return edges[i];
                }
            }
        }

        // 步骤 3：再尝试删除构成入度为 1 的边，看看是否形成环
        for (int i = len - 1; i >= 0; i--) {
            if (inDegree[edges[i][1]] == 1) {
                // 如果不构成环，这条边就是要去掉的那条边
                if (!judgeCircle(edges, len, i)) {
                    return edges[i];
                }
            }
        }
        throw new IllegalArgumentException("输入不符合要求。");
    }

    /**
     * 将 removeEdgeIndex 去掉以后，剩下的有向边是否构成环
     *
     * @param edges
     * @param len             结点总数（从 1 开始，因此初始化的时候 + 1）
     * @param removeEdgeIndex 删除的边的下标
     * @return 构成环，返回 true
     */
    private boolean judgeCircle(int[][] edges, int len, int removeEdgeIndex) {
        UnionFind unionFind = new UnionFind(len + 1);
        for (int i = 0; i < len; i++) {
            if (i == removeEdgeIndex) {
                continue;
            }
            if (!unionFind.union(edges[i][0], edges[i][1])) {
                // 合并失败，表示 edges[i][0] 和 edges[i][1] 在一个连通分量里，即构成了环
                return true;
            }
        }
        return false;
    }

    private class UnionFind {
        // 代表元法
        private int[] parent;

        public UnionFind(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                // 路径压缩（隔代压缩）
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        /**
         * @param x
         * @param y
         * @return 如果合并成功返回 true
         */
        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) {
                return false;
            }
            parent[rootX] = rootY;
            return true;
        }
    }

    public static void main(String[] args) {
        int[][] edges = {{1, 2}, {2, 3}, {3, 1}, {1, 4}};
        Solution solution = new Solution();
        int[] res = solution.findRedundantDirectedConnection(edges);
        System.out.println(Arrays.toString(res));
    }
}
```
