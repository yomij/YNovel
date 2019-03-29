<template>
	<div class="book-store">
		<div class="f-align-l search" @click="searchShow = true">
			<i class="iconfont icon-yonghu"></i>
			<p>{{'aaa'}}</p>
		</div>
		<Search @transShow="searchShow = false" :show="searchShow"/>
		<nav class="f-align-l">
			<div class="item" @click="navActive = index" v-for="(item, index) in ['男生', '女生']" :key="index">{{item}}</div>
			<div class="border" :style="{left: 32 * (2 * navActive + 1) + 'px'}"></div>
		</nav>
		<article class="main">
			<section>
				<h2>24小时点击</h2>
				<Carousel :list="topList"/>
				<div class="book-list f-s-b">
					<Book class="book" :book="book" :key="index" v-for="(book, index) in topList"/>
				</div>
			</section>
			<section>
				<h2></h2>
				<div class="book-list f-s-b">
					<Book class="book" :book="book" :key="index" v-for="(book, index) in topList"/>
				</div>
			</section>
			<section>
				<h2>24小时点击</h2>
				<div class="book-list f-s-b">
					<Book class="book" :book="book" :key="index" v-for="(book, index) in topList"/>
				</div>
			</section>
		</article>
	</div>
</template>

<config>
	{
		"navigationBarBackgroundColor": "#ffffff",
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "书城",
		"backgroundColor": "#eeeeee",
		"backgroundTextStyle": "light",
		"usingComponents": {
			"van-search": "/vant/search/index",
			"van-popup": "/vant/popup/index"
		}
	}
</config>

<script>
	import Carousel from '@/components/Carousel.vue'
	import Book from '@/components/Book.vue'
	import YSearch from '@/components/YSearch.vue'
	export default {
		components: {
			Carousel,
			Book,
			Search: YSearch
		},
		data() {
			return {
				navActive: 0,
				searchShow: false,
				topList: [{
					title: '吃葡萄',
					author: '有米',
					mainImg:'http://hbimg.b0.upaiyun.com/75cdb7cfd53c1eeead7f5333e673e9e669e456d5752e-RNtNWd_fw658'
				},{
					title: '吃葡萄皮',
					author: '番茄',
					mainImg: 'http://img1.imgtn.bdimg.com/it/u=3364060647,1821019892&fm=26&gp=0.jpg'
				},{
					title: '吃葡萄不吐葡萄皮',
					author: '土豆',
					mainImg:'http://pic1.win4000.com/mobile/2018-12-10/5c0e13e2e923a.jpg'
				}, {
					title: '吃葡萄不吐葡萄皮',
					author: 'yomi',
					mainImg:'http://pic1.win4000.com/mobile/2018-12-10/5c0e13e2e923a.jpg'
				}]
			}
		},
		beforeCreate() {
			console.log('Page [hello] Vue beforeCreate')
		},
		created() {
			setTimeout(() => {

			})
		},
		beforeMount() {
			console.log('Page [hello] Vue beforeMount')
		},
		mounted() {
			console.log('Page [hello] Vue mounted')
		},
		onLoad: function(options) {
			// Do some initialize when page load.
			console.log('Page [hello] onLoad')
		},
		onReady: function() {
			// Do something when page ready.
			console.log('Page [hello] onReady')
		},
		onShow: function() {
			// Do something when page show.

		},
		onHide: function() {
			// Do something when page hide.
			console.log('Page [hello] onHide')
		},
		onUnload: function() {
			// Do something when page close.
			console.log('Page [hello] onUnload')
		},
		/**
		 * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
		 */
		methods:{
			changeStat: function(){
				this.t++
				this.color = '#'+Math.floor(Math.random()*0xffffff).toString(16)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.book-store {
		padding-top: 11px;
	}
	.search {
		width: 91.67%;
		margin: 0 auto;
		background: #f6f7fb;
		height: 38px;
		border-radius: 4px;
		line-height: 38px;
		font-size: 14px;
		color: #acb0b9;
		padding: 0 9px;
		i {
			padding-right: 10px;
			color: #868c98;
		}
	}
	.main {
		padding: 0 15px;
		h2 {
			font-size: 22px;
			font-weight: bold;
			line-height: 100%;
			margin: 18px 0;
		}
		section {
			border-bottom: 1px solid #e8ebf0;
		}
	}
	.book-list {
		margin-top: 16px;
		.book {
			margin-bottom: 18px;
		}
	}
	nav {
		position: relative;
		height: 53px;
		line-height: 50px;
		box-shadow: 0 8px 10px rgba(57, 74, 113, 0.05);
		.item {
			font-size: 16px;
			padding: 0 16px;
			position: relative;
		}
		.border {
			display: inline-block;
			background: #e74749;
			width: 15px;
			height: 2px;
			position: absolute;
			bottom: 0;
			left: 32px;
			transform: translateX(-50%);
			transition: all .2s;
		}
	}
</style>
