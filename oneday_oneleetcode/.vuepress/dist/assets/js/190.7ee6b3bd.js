(window.webpackJsonp=window.webpackJsonp||[]).push([[190],{543:function(s,t,a){"use strict";a.r(t);var e=a(25),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"石子游戏"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#石子游戏"}},[s._v("#")]),s._v(" 石子游戏")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("难度")]),s._v(" "),a("p",[s._v("中等")])]),s._v(" "),a("p",[a("img",{attrs:{src:"http://qiniu.gaowenju.com/leecode/banner/more-021.jpg",alt:"more-021"}})]),s._v(" "),a("h2",{attrs:{id:"题目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#题目"}},[s._v("#")]),s._v(" "),a("a",{attrs:{href:"https://leetcode-cn.com/problems/stone-game/",target:"_blank",rel:"noopener noreferrer"}},[s._v("题目:"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("亚历克斯和李用几堆石子在做游戏。偶数堆石子排成一行，每堆都有正整数颗石子  piles[i] 。")]),s._v(" "),a("p",[s._v("游戏以谁手中的石子最多来决出胜负。石子的总数是奇数，所以没有平局。")]),s._v(" "),a("p",[s._v("亚历克斯和李轮流进行，亚历克斯先开始。 每回合，玩家从行的开始或结束处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中石子最多的玩家获胜。")]),s._v(" "),a("p",[s._v("假设亚历克斯和李都发挥出最佳水平，当亚历克斯赢得比赛时返回  true ，当李赢得比赛时返回  false 。")]),s._v(" "),a("h3",{attrs:{id:"示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[s._v("#")]),s._v(" 示例")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("输入：[5,3,4,5]\n输出：true\n解释：\n亚历克斯先开始，只能拿前 5 颗或后 5 颗石子 。\n假设他取了前 5 颗，这一行就变成了 [3,4,5] 。\n如果李拿走前 3 颗，那么剩下的是 [4,5]，亚历克斯拿走后 5 颗赢得 10 分。\n如果李拿走后 5 颗，那么剩下的是 [3,4]，亚历克斯拿走后 4 颗赢得 9 分。\n这表明，取前 5 颗石子对亚历克斯来说是一个胜利的举动，所以我们返回 true 。\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("h3",{attrs:{id:"提示"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提示"}},[s._v("#")]),s._v(" 提示")]),s._v(" "),a("ol",[a("li",[s._v("2 <= piles.length <= 500")]),s._v(" "),a("li",[s._v("piles.length 是偶数。")]),s._v(" "),a("li",[s._v("1 <= piles[i] <= 500")]),s._v(" "),a("li",[s._v("sum(piles) 是奇数。")])]),s._v(" "),a("p",[a("strong",[s._v("比较")])]),s._v(" "),a("p",[s._v("相比"),a("RouterLink",{attrs:{to:"/leetcode/202009/20200901.html"}},[s._v("20200901: 预测赢家 (难度:中等)")]),s._v("，本题多数组元素总会为奇数(不会存在相等情况)，元素个数为偶数的条件")],1),s._v(" "),a("p",[s._v("新增的条件在采用递归方法和动态规划，时不影响逻辑，则预测赢家的递归解法直接复用同样可以。")]),s._v(" "),a("p",[s._v("**注意：**本题只有优化过的递归解法可以通过")]),s._v(" "),a("ul",[a("li",[s._v("直接递归")])]),s._v(" "),a("p",[a("img",{attrs:{src:"http://qiniu.gaowenju.com/leecode/more-021-1.png",alt:"直接递归"}})]),s._v(" "),a("ul",[a("li",[s._v("优化递归")])]),s._v(" "),a("p",[a("img",{attrs:{src:"http://qiniu.gaowenju.com/leecode/more-021.png",alt:"优化递归"}})]),s._v(" "),a("ul",[a("li",[s._v("直接递归")])]),s._v(" "),a("p",[s._v("那么已经存 预测赢家 这个题目了，本次存在的意义是什么呢")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @param {number[]} piles\n * @return {boolean}\n */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("stoneGame")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("piles")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("相信自己的眼睛，官方数学解法 直接 return true，统一可以通过")]),s._v(" "),a("p",[s._v("那么就是说，元素个数偶数，先手的亚历克斯一定取胜")]),s._v(" "),a("p",[s._v("本题存在的意义就是论证，如果数组的长度是偶数，就一定是先手获胜")]),s._v(" "),a("p",[s._v("其实也不是很难理解：")]),s._v(" "),a("ul",[a("li",[s._v("两个人分别取数组里面的值，换种表达方式就是将数组分成两份，又因为数组的和是奇数，那么一定存在一份和大一份和小")]),s._v(" "),a("li",[s._v("其中每分和代表的是一种选择顺序")]),s._v(" "),a("li",[s._v("先手就可以先选择哪种选择顺序，所以先手一定能获胜")])]),s._v(" "),a("p",[s._v("**注意：**假设亚历克斯和李都发挥出最佳水平并不是指代每部都是选择最大的，而是形成的选择顺序是最优的")])])}),[],!1,null,null,null);t.default=n.exports}}]);