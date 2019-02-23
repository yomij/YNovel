<template>
	<div class="bookrack">
		<div class="user f-align">
			<div class="f-align" @click="login">
				<img :src="avatarDefault"/>请登录
			</div>
		</div>
		<div class="subscription">
			<div class="item f-align" v-for="(item, index) in bookList" :class="{'show-op':item.showOperation}" :key="index">
				<div class="content f-align justify">
					<div class="f-align">
						<img class="book-img" :src="item.mainImg">
						<div>
							<p class="title">{{item.title}}</p>
							<p>{{item.status}}</p>
							<p>{{item.lastUpdate}}</p>
						</div>
					</div>
					<img class="more" :src="iconMore" @click="showOperation(index)"/>
				</div>
				<div class="extra flex">
					<div class="operation">顶置</div>
					<div class="operation">删除</div>
				</div>
			</div>
			<p class="no-more">您已读完全部内容</p>
		</div>
	</div>
</template>

<script>
	import HelloWorld from '@/components/HelloWorld.vue'
	import avatar from '@/assets/imgs/avatar_default.png'
	import iconMore from '@/assets/icons/icon_more.png'
	export default {
		components: {
			HelloWorld
		},
		data() {
			return {
				avatarDefault: avatar,
				iconMore,
				bookList: [{
					mainImg: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/09/0C/ChMkJ1uJNc6IPVDAAAoO2v9qSVQAArXegM7fGIACg7y539.jpg',
					title: '我是大黑猪',
					status: '未读',
					lastUpdate: '昨天',
					showOperation: false
				}, {
					mainImg: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/09/0C/ChMkJ1uJNc6IPVDAAAoO2v9qSVQAArXegM7fGIACg7y539.jpg',
					title: '我是大黑猪',
					status: '未读',
					lastUpdate: '昨天',
					showOperation: false
				}, {
					mainImg: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/09/0C/ChMkJ1uJNc6IPVDAAAoO2v9qSVQAArXegM7fGIACg7y539.jpg',
					title: '我是大黑猪',
					status: '未读',
					lastUpdate: '昨天',
					showOperation: false
				}]
			}
		},
		beforeCreate() {
			console.log('Page [hello] Vue beforeCreate')
		},
		created() {
			console.log(this.avatarDefault)
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
		onReady: function() {
			// Do something when page ready.
			console.log('Page [hello] onReady')
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
			},
			login () {
				this.$router.push({query: {id: 1}, path: '/pages/bookrack/login'})
			},
			showOperation (i) {
				console.log(i)
				this.$set(this.bookList[i], 'showOperation', !this.bookList[i].showOperation)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bookrack{
		.user {
			color: #666;
			font-size: 14px;
			background-color: #fff;
			width: 92%;
			height: 80px;
			margin: 10px auto;
			border-radius: 5px;
			box-shadow: 0 2px 10px .5px rgba(0, 0, 0, .1);
			padding: 0 17px;
			img {
				height: 48px;
				width: 48px;
				border-radius: 50%;
				margin-right: 14px;
			}
		}
		.subscription {
			width: 100%;
			margin: 12px auto 0;
			.content {
				width: 100%;
				height: 100%;
				padding: 10px 4%;
			}
			.item {
				width: calc(100% + 150px);
				height: 92px;
				/*margin-bottom: 10px;*/
				font-size: 11px;
				color: #666;
				transition: all .3s;
				.more {
					width: 24px;
					height: 24px;
				}
				&.show-op {
					transform: translateX(-150px);
				}
			}
			.title {
				font-size: 15px;
				color: #333;
			}
			.book-img {
				width: 54px;
				height: 72px;
				margin-right: 12px;
				border-radius: 3px;
			}
			.extra {
				font-size: 14px;
				color: #fff;
				height: 100%;
				position: relative;
				width: 150px;
				text-align: center;
				line-height: 92px;
				.operation {
					width: 75px;
					height: 100%;
					&:first-child {
						background:linear-gradient(45deg, #678bd8 0%,#5d79cc 100%);
					}
					&:last-child {
						background:linear-gradient(45deg, #ed434c 0%,#fe6658 100%);
					}
				}
			}
			.no-more {
				font-size: 11px;
				color: #666;
				margin: 10px 0;
				text-align: center;
			}
		}
	}
</style>
