import App from './App'
import Vue from 'vue'
import api from '@/api'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import megaloRouter  from 'megalo-router'

import Toast from 'vant-weapp/dist/toast/toast';
import formatDate from '@/utils/formatDate'
import dateAgo from '@/utils/dateAgo'
import throttle from '@/utils/throttle'
import bev from '@/utils/behaivor'

Vue.use(megaloRouter, {
	mode: 'strict', // strict or loose 可配置项，不配置的话默认为strict
	tabBars: [ // 必须配置项
    // 'pages/bookrack/login',
		'pages/bookrack',
		'pages/bookStore',
		'pages/recommend'
	]
})

Vue.use(VHtmlPlugin)

Vue.prototype.$api = api
Vue.prototype.$toast = Toast
Vue.prototype.$utils = {
	formatDate,
	dateAgo,
	throttle,
	bev
}
Megalo.prototype.$toast = Toast

const app = new Vue(App)

app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
			'pages/bookrack/login',
			'pages/personalCenter/index',

	    // 'pages/bookrack/login',
	    'pages/bookDetail/index',
	    'pages/bookStore',
			'pages/readPage/index',

	    // 'pages/readPage/index',
			'pages/searchResult/index',
	    'pages/recommend',
			'pages/bookrack',
    ],
    tabBar: {
      color: '#3e4347',
      selectedColor: '#e34a4f',
      list: [
        {
        pagePath: 'pages/recommend',
        text: '推荐',
        iconPath: 'static/imgs/recommend.png',
        selectedIconPath: 'static/imgs/recommend-a.png',
        },
				{
					pagePath: 'pages/bookStore',
					text: '书城',
					iconPath: 'static/imgs/bookstore.png',
					selectedIconPath: 'static/imgs/bookstore-a.png',
				},
				{
					pagePath: 'pages/bookrack',
					text: '书架',
					iconPath: 'static/imgs/bookrack.png',
					selectedIconPath: 'static/imgs/bookrack-a.png',
				}
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Yomi',
      navigationBarTextStyle: 'white'
    },
		"usingComponents": {
			"van-search": "/vant/search/index",
			"van-toast": "/vant/toast/index",
			"van-popup": "/vant/popup/index",
		}
  }
}
