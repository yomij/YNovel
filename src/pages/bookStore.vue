<template>
	<div class="book-store">
		<div class="f-align-l search">
			<i class="iconfont icon-yonghu"></i>
			<p>{{'aaa'}}</p>
		</div>
		<nav class="f-align-l">
			<div class="item" @click="navActive = index" v-for="(item, index) in ['男生', '女生']" :key="index">{{item}}</div>
			<div class="border" :style="{left: 32 * (2 * navActive + 1) + 'px'}"></div>
		</nav>
		<article class="main">
			<section>
				<h2>24小时点击</h2>
				<Carousel :list="topList"/>
				<div class="book-list">
					<div>
						<img />
						<p>黄金眼</p>
						<p>作者</p>
					</div>
				</div>
			</section>
		</article>
	</div>
</template>

<script>
	import Carousel from '@/components/Carousel.vue'
	export default {
		components: {
			Carousel
		},
		data() {
			return {
				navActive: 0,
				topList: [{
					title: '1',
					author: 'yomi',
					mainImg:'http://hbimg.b0.upaiyun.com/75cdb7cfd53c1eeead7f5333e673e9e669e456d5752e-RNtNWd_fw658'
				},{
					title: '2',
					author: 'yomi',
					mainImg: 'http://img1.imgtn.bdimg.com/it/u=3364060647,1821019892&fm=26&gp=0.jpg
				},{
					title: '3',
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
		margin: 0 auto 18px;
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
	}

	nav {
		position: relative;
		height: 53px;
		line-height: 50px;
		box-shadow: 0 8px 10px rgba(57, 74, 113, 0.1);
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
