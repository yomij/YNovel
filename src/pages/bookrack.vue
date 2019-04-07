<template>
	<div class="bookrack">
		<div class="user f-align-l">
			<div class="f-g-1 f-align-l"  @click="login">
				<img :src="userInfo.avatarUrl"/>{{userInfo ? userInfo.nickname :'请登录'}}
			</div>
			<div class="bind">
				<button v-if="!userInfo.phone">绑定手机号</button>
			</div>
		</div>
		<div class="subscription">
			<div class="item f-align" v-for="(item, index) in bookList" :class="{'show-op':item.showOperation}" :key="index">
				<div class="content f-align f-s-b">
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
			<p v-if="bookList.length" class="no-more">您已读完全部内容</p>
			<div class="no-data">
				<p class="f-18 c-6">暂无作品</p>
				<p @click="$router.replace({path: 'pages/recommend'})" class="f-13 c-lb">去推荐看看</p>
			</div>
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
				bookList: [],
				userInfo: null
			}
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
			this.$api.getUserInfo().then(res => {
				if (res.status === 200) {
					this.userInfo = res.data
				}
			})
			console.log('Page [hello] onShow')
		},
		onHide: function() {
			// Do something when page hide.
			console.log('Page [hello] onHide')
		},
		/**
		 * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
		 */
		methods:{
			login () {
				this.$router.push({query: {id: 1}, path: '/pages/bookrack/login'})
			},
			showOperation (i) {
				console.log(i)
				this.$set(this.bookList[i], 'showOperation', !this.bookList[i].showOperation)
			},
			getData () {

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
		.bind {
			border-left: 2px solid rgba(200, 200, 200, .8);
			button {
				margin-left: 15px;
				padding: 0 13px;
				font-size: 11px;
				height: 27px;
				line-height: 27px;
				border-radius: 30px;
				color: #fff;
				background:linear-gradient(45deg, #ec383c 0%,#fd563d 100%);
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
		.no-data {
			text-align: center;
			margin-top: 170px;
			a {
				margin-top: 13px;
			}
		}
	}
</style>
