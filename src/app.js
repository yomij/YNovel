import App from './App'
import Vue from 'vue'
import api from '@/api'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import megaloRouter  from 'megalo-router'

import Toast from '@/static/vant/toast/toast';
import formatDate from '@/utils/formatDate'

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
	formatDate
}

const app = new Vue(App)

app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [

	    // 'pages/bookrack/login',
	    'pages/bookDetail/index',
	    'pages/bookStore',
			'pages/readPage/index',
	    // 'pages/readPage/index',
			'pages/searchResult/index',
	    'pages/recommend',
			'pages/bookrack',
			'pages/bookrack/login',
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
        pagePath: 'pages/recommend',
        text: '推荐',
        iconPath: 'static/imgs/mine.png',
        selectedIconPath: 'static/imgs/mine_on.png',
        },
				{
					pagePath: 'pages/bookStore',
					text: '书城',
					iconPath: 'static/imgs/home.png',
					selectedIconPath: 'static/imgs/home_on.png',
				},
				{
					pagePath: 'pages/bookrack',
					text: '书架',
					iconPath: 'static/imgs/mine.png',
					selectedIconPath: 'static/imgs/mine_on.png',
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
			"van-toast": "/vant/toast/index"
		}
  }
}
