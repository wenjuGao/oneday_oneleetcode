// 配置文件的入口文件，也可以是 YML 或 toml

module.exports = {
	base: '/oneday_oneleetcode/',
	title: '坑人的小书童',
	description: '每天一道leetcode，从零开始学习算法 一天一大leet 小书童 坑人的小书童',
	extraWatchFiles: [
		'README.md', // 使用相对路径
	],
	plugins: [
		'@vuepress/back-to-top',
		'@vuepress/medium-zoom',
		[
			'@vuepress/last-updated',
			{
				transformer: (timestamp, lang) => {
					const moment = require('moment')
					moment.locale(lang)
					return moment(timestamp).fromNow()
				}
			}
		]
	],
	themeConfig: {
		logo: 'http://qiniu.gaowenju.com/bookc.png',
		repo: 'https://gitee.com/krdxst/oneday_oneleetcode',
		repoLabel: '查看源码',
		editLinkText: '帮助我们改善此页面！',
		editLinks: true,
		docsBranch: 'page',
		sidebarDepth: 2,
		lastUpdated: '上次更新',
		smoothScroll: true,
		nav: [{
			text: '首页',
			link: '/'
		},
		{
			text: 'leetcode',
			ariaLabel: 'leetcode',
			items: [{
				text: '202006',
				link: '/leetcode/202006/'
			}, {
				text: '202007',
				link: '/leetcode/202007/'
			}]
		},
		{
			text: '算法',
			link: '/blog/'
		},
		{
			text: '博客',
			link: 'http://gaowenju.com',
			target: '_blank'
		},
		],
		sidebar: []
	},
	markdown: {
		lineNumbers: true,
		anchor: {
			permalink: true,
			permalinkBefore: true,
			permalinkSymbol: '#'
		},
		externalLinks: {
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		toc: {
			includeLevel: [2, 3]
		},
		plugins: {
			'@org/foo': {},
			'markdown-it-bar': {
				// 提供你的选项
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@assets': './assets'
			}
		}
	}
}