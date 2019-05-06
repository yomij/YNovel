<template>
	<div class="personal-center">
		<div class="box">
			<img :src="info.user.avatar"/>
			<p class="nick">{{info.user.nickname}}</p>
			<div class="f-align">
				<div class="item">
					<div class="f-align num"><h1>{{info.totalRead}}</h1><span class="f-10">本</span></div>
					<button>读过</button>
				</div>
				<div class="border"></div>
				<div class="item">
					<div class="f-align num"><h1>{{info.readTime.v}}</h1><span class="f-10">{{info.readTime.k}}</span></div>
					<button>累计阅读</button>
				</div>
			</div>
		</div>
		<!--<button open-type='feedback' type='primary'>意见反馈</button>-->
		<div class="f-a-s problem van-hairline--top-bottom" @click="problem">
			<i class="iconfont icon-weixin"></i>问题反馈
		</div>
		<div class="input-box" v-show="showInput" :style="{bottom: (inputBottom + textHeight) * 2  + 'rpx'}">
			<textarea id="aaaa-y" :auto-height="true" :show-confirm-bar="false" class="iiinput" @focus="inputFocus" :adjust-position="false" :focus="true" :auto-focus="true" v-model="problemText" v-show="showInput" />
		</div>
		<p class="exit" @click="exit">退出登陆</p>
	</div>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				info: {
					user:{
						avatar: '',
						nickname: ''
					},
					totalRead: '',
					readTime: {k:'小时', v: 0}
				},
				showInput: false,
				problemText: '',
				inputBottom: 0,
				textHeight: 0
			}
		},
		onShow () {
			// 获取数据
			this.$api.readInfo().then(res => {
				if(res.status === 200) {
					const data = res.data
					this.info = {
						user:{
							avatar: decodeURIComponent(this.$route.query.avatar),
							nickname: this.$route.query.nickname
						},
						totalRead: data.count || 0,
						readTime: this.transTime(data.readTime)
					}
				}
			})
		},

		methods:{
			exit() {
				const _this = this
				Megalo.removeStorage({
					key: 'authorization',
					success() {
						_this.$router.reLaunch('/pages/bookStore')
					}
				})
			},
			inputFocus(e){
				// const query = wx.createSelectorQuery()
				// query.selectAll('#aaaa-y').boundingClientRect()
				// const that = this
				// query.exec(function (res) {
				// 	that.textHeight = res[0][0].height
				// 	console.log(that.inputBottom , that.textHeight,   'rpx')
				// })

				this.inputBottom = e.detail.height
				console.log(e, this.inputBottom)
			},
			input(e) {
				// const query = wx.createSelectorQuery()
				// query.selectAll('#aaaa-y').boundingClientRect()
				// const that = this
				// query.exec(function (res) {
				// 	that.textHeight = res[0][0].height
				// 	console.log(that.inputBottom , that.textHeight,   'rpx')
				// })
			},
			problem() {
				this.problemText = ''
				this.showInput = true
			},
			transTime(t) {
				if(!t || t < 10 * 1000) return {v:0,k:'小时'}
				if (t < 60 * 1000) return {v:(t/ 1000).toFixed(0), k: '秒'}
				if (t < 60 * 60 * 1000) return {v:(t / 1000 / 60).toFixed(2), k: '分钟'}
				else return {v:(t / 1000 / 60 / 60).toFixed(2), k: '小时'}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.personal-center {
		padding:  15px;
	}
	.box {
		position: relative;
		height: 188px;
		box-shadow: 0px 3px 12px rgba(57, 74, 113, .2);
		margin-top: 55px;
		border-radius: 5px;
		img {
			height: 55px;
			width: 55px;
			border-radius: 55px;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.nick {
			width: 100%;
			text-align: center;
			font-size: 15px;
			color: #555;
			padding: 40px 0 30px;
		}
		.item {
			position: relative;
			text-align: center;
			width: 50%;
			span {
				transform: translateY(5px);
				color: #666666;
			}
		}
		.border {
			width: 2px;
			height: 72px;
			background-color: rgba(222, 222, 222, .2);
		}
		.num {
			margin-bottom: 16px;
		}
		h1 {
			font-size: 26px;
		}
		button {
			position: relative;
			transform: translateX(-50%);
			left: 50%;
			padding: 0 13px;
			font-size: 11px;
			line-height: 27px;
			border-radius: 30px;
			color: #fff;
			width: 72px;
			height: 30px;
			background:linear-gradient(45deg, #ec383c 0%,#fd563d 100%);
		}
		
	}
	.problem {
		padding: 18px 0;
		margin-top: 15px;
		font-size: 14px;
		i{
			color:#ec383c;
			margin-right: 8px;
		}
	}
	.exit {
		color: #ec383c;
		font-size: 14px;
		text-align: center;
		margin-top: 18px;
	}
	.iiinput {
		background-color: rgba(57, 74, 113, .3);
		width: 293px;
		font-size: 14px;
		color: #555;
		border-radius: 50px;
		min-height: 34px;
		padding: 0 17px;
	}
	.input-box {
		position: fixed;
		padding: 9px 15px;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-top: 1px solid rgba(57, 74, 113, .3);
	}
</style>
