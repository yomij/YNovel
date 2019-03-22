<template>
	<div class="reading">
		<nav class="nav f-align-l" :style="{'padding-top': statusBarHeight + 'px', background: status.navBg, color: status.navColor }">
			<i class=" back iconfont icon-weixin" @click="$router.go(-1)"></i>{{'一只狗的一生'}}
		</nav>
		<section class="content" :style="{background: status.bg, color: status.color, fontSize: mainFontSize + 'rpx'}" @longpress="handleLongpress" @tap="hideOperation">
			<h1>第一章 困的一的YOMI</h1>
			<div class="text">
				<p>2017年11月10日，2017全球未来出行高层论坛暨国际展览会在杭州国际博览中心拉开帷幕。开幕当天，帝亚一维新能源汽车有限公司（下称“帝亚一维”）正式发布了公司旗下首款电动汽车的Beta版。</p>
				<p>蒂亚一维这个名字初听有些陌生，这家年轻的新能源汽车公司在今年2月刚刚注册成立。仅仅9个月时间就推出了首款产品。</p>
				<p>帝亚一维新能源汽车有限公司由江苏悦达创业投资有限公司、IDG资本、北京联动天翼科技股份公司、阿尔特汽车技术股份有限公司以及自然人股东，共同出资成立的以纯电动汽车的研发、制造、营销为一体的高新技术企业，由汽车业内多名资深人士组建团队。</p>
				<p>不同于当下新能源汽车企业高管多有互联网企业背景的现状，蒂亚一维的核心团队均来自传统汽车制造业。公司总裁何坤，曾先后任职广汽长丰汽车有限公司副总经理，明君汽车产业股份有限公司总裁；副总裁王敦明，曾先后任职于东风汽车公司销售部总经理助理、东风悦达起亚销售本部副本部长；副总裁：蔡峰，海南一汽海马汽车销售有限公司总经理。</p>
			</div>
		</section>
		<van-popup
				class="list"
				:style="{color: status.color}"
				:show="listShow"
				position="left"
				@close="listShow = false"
		>
			<div class="book-info f-align-l" :style="{background: status.listTitleBg}">
				<img src="http://pic1.win4000.com/mobile/2018-12-10/5c0e13e2e923a.jpg"/>
				<div class="f-g-1">
					<h3>帅的一的何彬彬</h3>
					<p>Yomi</p>
				</div>
				<i class=" back iconfont icon-weixin"></i>
			</div>
			<LoadSection noBorder :color="[status.color, status.listBg]" class="load-box" @loading="loading" :sectionList="sectionList"/>
		</van-popup>
		<footer v-show="operationShow" :style="{background: status.operationBg, color: status.color}">
			<div>
				<h2 class="f-align">第一章 困的一的YOMI</h2>
				<div class="f-align">
					<i class=" pre iconfont icon-weixin" @click="nowCount--"></i>
					<van-slider class="f-g-1" use-button-slot :inactive-color="status.barBg" :active-color="status.activeBarBg" :min="0" :value="(nowCount / total.toFixed(2) * 100)" @change="sectionChange">
						<div class="custom-button" :style="{background: status.activeBarBg}" slot="button">
						</div>
					</van-slider>
					<i class=" next iconfont icon-weixin" @click="nowCount++"></i>
				</div>
				<ul  class="f-align" :style="{}">
					<li class="f-dir-column f-align" @click="catalogue">
						<i class="back iconfont icon-weixin"></i>
						<span :style="{color: status.color}">目录</span>
					</li>
					<li class="f-dir-column f-align" @click="night">
						<i class=" back iconfont icon-weixin"></i>
						<span :style="{color: status.color}">夜间</span>
					</li>
					<li class="f-dir-column f-align" @click="setting">
						<i class=" back iconfont icon-weixin"></i>
						<span :style="{color: status.color}">设置</span>
					</li>
				</ul>
			</div>
		</footer>
		<footer v-show="settingShow" class="setting" :style="{background: status.operationBg, color: status.color}">
			<div>
				<div class="f-align fontsize">
					<i class=" pre iconfont icon-weixin" @click="nowCount--"></i>
					<van-slider class="f-g-1" use-button-slot :inactive-color="status.barBg" :active-color="status.activeBarBg" :value="readConfig.fontDefaultCount" @drag="fontChange">
						<div class="custom-button" :style="{background: status.activeBarBg}" slot="button">
						</div>
					</van-slider>
					<i class=" next iconfont icon-weixin" @click="nowCount++"></i>
				</div>
				<div class="f-align">
					<i class=" pre iconfont icon-weixin" @click="nowCount--"></i>
					<van-slider class="f-g-1" use-button-slot :inactive-color="status.barBg" :active-color="status.activeBarBg" :value="brightness * 100" @drag="brightnessChange">
						<div class="custom-button" :style="{background: status.activeBarBg}" slot="button">
						</div>
					</van-slider>
					<i class=" next iconfont icon-weixin" @click="nowCount++"></i>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
	import LoadSection from '@/components/LoadSection.vue'
	
	const config = {
		minFontSize: 18,
		fontSize: 36,
		maxFontSize: 54
	}
	
	export default {
		components: {
			LoadSection
		},
		data() {
			return {
				status: {
					navBg: '#f7f8fc',
					navColor: '#000',
					color: '#404040',
					bg: '#f3f3f3',
					operationBg: '#ffffff',
					activeBarBg: '#3b3e47',
					barBg: '#e5e5e5',
					listBg: '#fff',
					listTitleBg: '#f2f2f2'
				},
				total: 1111,
				nowCount: 1,
				mainFontSize: 36,
				brightness: 0.5,
				readConfig: {
					fontDefaultCount: 50,
				},
				statusBarHeight: 20,
				listShow: false,
				operationShow: true,
				settingShow: false,
				sectionList: [
					{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					},{
						title: '第一章 嘶啦嘶啦地',
						time: '2019-09-30 12:12:12'
					}],
			}
		},
		created() {
			// var appInstance = getApp()
			// console.log(appInstance.globalData.then()) // I am global data
			Megalo.getSystemInfo().then(res => {
				console.log(res)
				this.statusBarHeight = res.statusBarHeight
			})
			Megalo.getScreenBrightness().then(res => this.brightness = res.value)
		},
		methods:{
			catalogue () {
				this.operationShow = false
				this.listShow = true
				console.log('a')
			},
			night () {
				this.status = {
					navBg: '#262626',
					navColor: '#fff',
					color: '#7e7e7e',
					bg: '#262626',
					operationBg: '#333333',
					activeBarBg: '#808080',
					barBg: '#474747',
					listBg: '#3d3d3d',
					listTitleBg: '#272727'
				}
			},
			sectionChange(e) {
				console.log(e)
				this.nowCount = Math.floor(e.detail * this.total / 100)
				
			},
			setting () {
				this.operationShow = false
				this.settingShow = true
			},
			fontChange (e) {
				const diff = (e.detail.value - 50) * (config.maxFontSize - config.minFontSize) / 100
				const fs = (diff + config.fontSize).toFixed(2)
				this.mainFontSize = fs
			},
			brightnessChange (e) {
				Megalo.setScreenBrightness({
					value: Math.round(e.detail.value * 100) / 10000
				})
			},
			handleLongpress () {
				this.operationShow = true
			},
			hideOperation () {
				this.operationShow = false
				this.settingShow = false
			},
			loading () {
				console.log('loading')
				this.sectionList.push(...[{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				},{
					title: 'aaa',
					time: 'aaa'
				}])
				this.sectionList.splice()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reading {
		position: absolute;
		min-height: 100%;
		width: 100%;
		background-color: #f3f3f3;
		padding-top: 90px;
	}
	.content {
		position: relative;
		h1 {
			padding: 38px 20px 26px;
			font-size: 23px;
			line-height: 100%;
		}
		p {
			line-height: 33px;
			text-indent: 36px;
		}
		.text {
			padding: 0 30px;
		}
		color: #404040;
	}
	.nav {
		position: fixed;
		top: 0;
		height: 90px;
		width: 100%;
		text-align: center;
		/*padding-top: 20px;*/
		font-size: 12px;
		/*color: #fff;*/
		display: block;
		opacity: 1;
		transition: all ease-in .15s;
		z-index: 2222;
		align-items: center;
		padding:  20px 32px 0;
		i {
			margin-right: 10px;
		}
	}
	
	.list {
		// d9d9d9
		position: relative;
		height: 100%;
		.book-info {
			padding: 0 16px;
			height: 87px;
			background-color: #f2f2f2;
			img {
				border: 1px solid #d9d9d9;
				height: 55.5px;
				width: 41.8px;
				margin-right: 13px;
			}
			h3 {
				font-size: 16px;
				margin-bottom: 3px;
			}
			p {
				font-size: 14px;
			}
		}
		
		.load-box {
			height: calc(100% - 90px);
		}
		& /deep/ {
			.van-popup, ._van-popup {
				width: 80% !important;
				margin-top: 90px;
			}
			.van-overlay {
				position: absolute;
				height: 100%;
				width: 100%;
			}
		}
	}

	footer {
		height: 142px;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		box-shadow: 0 -2px 15px rgba(0,0,0,.1);
		&.setting {
			height: 88px;
			padding: 18px 0;
			.fontsize {
				margin-bottom: 15px;
			}
		}
		.custom-button {
			background: #383b42;
			height: 14px;
			width: 14px;
			border-radius: 14px;
		}
		.pre, .next {
			margin: 0 32px;
		}
		h2 {
			font-size: 14px;
			margin: 18px 0 26px;
		}
		ul {
			position: absolute;
			height: 47.4px;
			width: 100%;
			bottom: 0;
		}
		li {
			font-size: 9px;
			width: 33.3%;
		}
	}
</style>
