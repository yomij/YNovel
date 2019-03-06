<template>
	<div class="recommend">
		<!--<Ysearch />-->
		<div class="f-align-l search">
			<i class="iconfont icon-yonghu"></i>
			<p>{{'aaa'}}</p>
		</div>
		<div class="main">
			<article class="book-box">
				<div class="f-align-l base">
					<img src="http://pic1.win4000.com/mobile/2018-12-10/5c0e13e2e923a.jpg"/>
					<div claass="info">
						<p class="title">圣墟</p>
						<p>辰东<span class="dot"></span>玄幻</p>
						<p>连载<span class="dot"></span>200万字<span class="dot"></span>评分8.9</p>
					</div>
				</div>
				<p class="introduce">覅就算是激发就安分守己俺爸爸加丹加骄傲覅就算是激发就安分守己俺爸爸加丹加骄傲覅就算是激发就安分守己俺爸爸加丹加骄傲覅就算是激发就安分守己俺爸爸加丹加骄傲覅就算是激发就安分守己</p>
				<p class="reason">-&nbsp;根据你看过的xxx推荐&nbsp;-</p>
				<div class="operation f-align">
					<i class="iconfont icon-yonghu"></i>
					<i class="iconfont icon-yonghu"></i>
					<button>立即阅读</button>
				</div>
			</article>
		</div>
		<p class="no-more">( ´◔ ‸◔`) &nbsp; 没有更多啦</p>
	</div>
</template>

<config>
	{
	"navigationBarBackgroundColor": "#ffffff",
	"navigationBarTextStyle": "black",
	"navigationBarTitleText": "快捷登录",
	"backgroundColor": "#eeeeee",
	"backgroundTextStyle": "light",
	"usingComponents": {
	"van-search": "/vant/search/index"
	}
	}
</config>

<script>
	import Ysearch from '@/components/Ysearch.vue'
	export default {
		components: {
			Ysearch
		},
		data() {
			return {
				logo: 'https://user-images.githubusercontent.com/20720117/48262986-80e02780-e45f-11e8-8426-2872916adad9.png',
				t: 1,
				color: '#007d37'
			}
		},
		beforeCreate() {
			console.log('Page [hello] Vue beforeCreate')
		},
		created() {
			console.log('Page [hello] Vue created')
			var appInstance = getApp()
			console.log(appInstance.globalData) // I am global data
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
		onShow: function() {
			// Do something when page show.
			wx.login({
				success(res) {
					console.log(res)
				}
			})
			console.log('Page [hello] onShow')
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
	.recommend {
		padding: 11px 16px 0;
	}
	.book-box {
		color: #777;
		line-height: 21px;
		font-size: 13px;
		margin: 0 auto 22px;
		padding: 32px 22px 30px;
		width: 327px;
		height: 320px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 3px 3px 20px rgba(57, 74, 113, 0.1);
		.title {
			font-size: 14px;
			color: #333;
			margin-bottom: 3px;
		}
		.base {
			margin-bottom: 20px;
		}
		.reason {
			font-size: 14px;
			color: #cfc4ab;
			margin-top: 18px;
			text-align: center;
		}
		.introduce {
			height: 41px;
			text-overflow: ellipsis;
			word-break: break-word;
		}
		.dot {
			display: inline-block;
			height: 4px;
			width: 4px;
			background-color: #777;
			border-radius: 5px;
			margin: 0 10px;
		}
		.operation {
			margin-top: 35px;
			padding-left: 6px;
			i {
				margin-right: 38px;
				color: #333;
			}
			button {
				width: 154px;
				height: 36px;
				margin-left: 15px;
				padding: 0 13px;
				font-size: 12px;
				line-height: 36px;
				border-radius: 30px;
				color: #fff;
				text-align: center;
				background:linear-gradient(45deg, #ed434c 0%,#fe7363 100%);
			}
		}

		img {
			box-shadow: 2px 2px 12px rgba(57, 74, 113, 0.2);
			border: 1px solid rgba(57, 74, 113, 0.1);
			width: 75px;
			height: 87px;
			border-radius: 3px;
			margin: 0 18px 0 9px;
		}
	}
	.search {
		background: #f6f7fb;
		height: 38px;
		border-radius: 4px;
		line-height: 38px;
		font-size: 14px;
		color: #acb0b9;
		padding: 0 9px;
		margin-bottom: 18px;
		i {
			padding-right: 10px;
			color: #868c98;
		}
	}
	.no-more {
		font-size: 13px;
		color: #999;
		text-align: center;
		margin-bottom: 15px;
	}
</style>
