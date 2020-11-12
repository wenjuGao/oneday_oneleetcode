---
title: 链表的中间结点
tags:
  - 链表的中间结点
sidebar: auto
---

### 链表的中间结点

::: tip 难度
简单
:::

![img](http://qiniu.gaowenju.com/leecode/banner/more-018.jpg)

## [题目:](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

给定一个带有头结点 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

### 示例

1. 示例 1

```
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```

2. 示例 2

```
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

### 提示

- 给定链表的结点数介于 1 和 100 之间。

## 抛砖引玉

![抛砖引玉](http://qiniu.gaowenju.com/leecode/more-018.png)

### 快慢指针

**思路**

求一个数组的中间元素：len/2,

- len 为奇数时向下取值,返回中间位置索引
- len 为偶数时存在两个中间位索引：len/2-1、(len/2)

换种思路理解：
讲节点两个一组，分成的组数应该就刚好等于 len/2

---

再看回来本题
链表每 next 两步算成一组，那 next 到结果是，组数就是中心位置

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  let item = head,
    step = head
  while (item != null && item.next != null) {
    item = item.next
    item = item.next
    step = step.next
  }
  return step
}
```

### 数组

将链表每个节点安装 next 存放到数组中
求数组的中点
**注意**
本题要求如果有两个索引返回第二个及(len/2)

```javascript
var middleNode = function(head) {
  let A = [head]
  while (A[A.length - 1].next != null) {
    A.push(A[A.length - 1].next)
  }
  return A[parseInt(A.length / 2, 10)]
}
```

### 单指针法

计算链表长度，得到中间长度
然后再查询到中间长度位置的节点

```javascript
var middleNode = function(head) {
  let n = 0,
    cur = head
  while (cur != null) {
    ++n
    cur = cur.next
  }
  let k = 0
  cur = head
  while (k < parseInt(n / 2, 10)) {
    ++k
    cur = cur.next
  }
  return cur
}
```
