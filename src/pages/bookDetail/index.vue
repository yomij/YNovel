<template>
	<div class="book-detail">
		<nav class="nav f-align" :class="{show: navShow || listShow}" :style="{'padding-top': statusBarHeight + 'px', 'background-color': colors[2]}">
			<i class=" back iconfont icon-weixin" @click="$router.go(-1)"></i>{{'一只狗的一生'}}
		</nav>

		<van-popup
			class="list"
			:show="listShow"
			position="left"
			@close="listShow = false"
		>
			<LoadSection @loading="loading" :sectionList="sectionList"/>
		</van-popup>
		<scroll-view
				class="main" id="detail-container"
				scroll-y
				@scroll="doScroll"
		>
			<div class="head-back f-align-l" :style="{'padding-top': statusBarHeight + 'px'}">
				<i class="iconfont icon-weixin"></i>
			</div>
			<!--<div v-for="c in colors" :style="{background: c, height: '50px', width: '50px'}"></div>-->
			<div class="book-bg" :style="{'background-color': colors[0]}">
				<div class="bg"  :style="{'background-image': 'url(' + mainImg + ')', 'background-color': color}"></div>
				<img :src="mainImg"/>
				<p class="title">{{'一只狗的一生'}}</p>
				<p class="f-12">大眼<span class="dot"></span>都市</p>
				<div class="extra f-align" :style="{'background-color': colors[1]}">
					<div class="item">
						<span>500</span>万字<br/>{{'连载'}}
					</div>
					<div class="item">
						<span>500</span><br/>热度
					</div>
					<div class="item">
						<span>9</span>分<br /> 1222人评价
					</div>
				</div>
			</div>
			<p class="desc" :class="{'show-all': descShow}">
				{{(desc.length > 66 && !descShow) ? desc.substr(0, 66) : desc}}
				<span><span v-if="desc.length > 66 && !descShow">...</span><span class="open" @click="descShow = !descShow">{{descShow ? '收起' :  '展开'}}</span></span>
			</p>
			<div class="catalogue van-hairline--top-bottom f-s-b">
				<div class="f-align-l f-18"><i class="iconfont icon-weixin mr-9"></i>目录</div>
				<p class="latest" @click="showList">昨天12：07更新至第三百七十章猪死了</p>
				<i class="iconfont icon-weixin f-18"></i>
			</div>
			<section class="comments">
				<h2>精彩评论</h2>
				<Comment />
				<Comment />
				<Comment />
			</section>
			<article class="pre-read" :class="{show: showArticle}">
				<i class="icon">章节试读</i>
				<section>
					<h3>第一章 飞来横祸</h3>
					<div>
						<p>一声哨响，再好的梦都结束了。邵锡从被窝里窜了起来，下了床，匆匆地穿上鞋，提起衣服，一边系纽扣，一边戴帽子，慌张地往外跑，来到新兵连已经一个多月了，他基本上已经习惯了这种紧张充实的生活，在这种大的环境下，邵锡也总结出了一些经验，如果按照正常的逻辑，把衣服穿好再出去的话，肯定会挨批，最简捷的方法是先穿上裤子，再穿好鞋子，戴上帽子，一手披上衣，一手系腰带，等到了集合的地方，正好一切就绪。</p>
						<p>连长早已在那里站好了，一边看着表，一边观察着陆续跑出来的新兵，各排各班开始整队，所有的同志都站的笔直，排长一声响亮的‘立正’之后，向连长敬礼汇报：“连长同志，一排参加早操集合完毕，应到四十二名，实到四十一名，一名值班，请您指示！”连长还礼道：“稍息！”</p>
						<p>其实排长带队汇报的时候，正是邵锡开始畅想的时候，刚来的时候，还对这场面有些不适应，现在已经觉得很平常了。在队伍里面，要站的笔挺，动一下都必须得打报告等待批准，规矩老多了，邵锡并不是那种本份的兵，这是他的个性使然，入伍之前，他是一个放荡不羁的少年，喜欢打架，喜欢调戏漂亮姑娘，但自从当了兵，这些‘特长’都几乎被埋没了。部队里流行三句特别通俗的话：用好自己的嘴巴，夹住自己的尾巴，管住自己的J巴，做到这‘三巴’，就算是一个初步合格的同志了。</p>
						<p>邵锡是一个不甘平庸的人，当初放弃了学业，毅然从军，很大程度上是被中央特卫团的名号‘忽悠’来的。中央特卫团，这名号响的震彻云霄！传说中的天下第一军，的确有它独到的魅力所在，能够到中央特卫团当一回兵，简直是祖宗八代积的德，光宗耀祖的很。那时候跟邵锡一块验兵的一个哥们儿，父母疯狂地甩出二十万，非要让自己的儿子来这支部队，但是特卫团挑兵不是一般的严，那可真是算得上千里挑一，文化，身体素质，智商，政审各方面都要达标，差一点儿也不行。结果，那哥们儿的父亲自认为有俩儿臭钱，武装部队里又有关系，以为板儿上钉了，谁知道他的儿子在文化考核中就光荣落选了。再怎么使劲，再怎么找人，都是无用功。</p>
						<p>邵锡身高一米八，体重七十五公斤，身体匀称，相貌端正，自认为这自然条件还算对得起自己的父母。穿着军装的他玉树临风，风度翩翩，而且文武双全，有着超凡的细胞和音乐天赋，不过，邵锡早在上高中的时候就有点儿‘自恋’情结，自认为是一名标准的美男子，是无数少女心中的绝版偶像，这话是有些骄傲了，不过事实也是如此，光高三一年，邵锡就收到过六位校花班花的…</p>
						<p>邵锡正想着自己的光辉历史，各排已经开始带队出操了，他不得不暂时放弃幻想，跟着排长的口令，稍息，立正，然后跑步走，围着基地跑了两大圈儿，大约五公里，带到了训练场上，简单地休息片刻，就开始了队列训练。</p>
						<p>其实邵锡对队列训练没什么好感，太单调，还一动不能动，班长是个第四年的一级士官，叫候永东，是个极富幽默感的大哥，但是训练起来相当严格，据说他曾是四大队应急分队的，身体素质刚刚的，在全团是出了名的。“两脚跟靠拢并齐，两脚向外分开约六十度，两腿挺直，小腹握，自然挺胸…”候永东一边重复着动作要领，一边验收新兵的姿态，给新兵们纠正动作，邵锡用眼睛斜视着他，心里却开了小差，思想跑到了九霄云外，毕竟，他特别喜欢幻想，也不知道为什么，他总喜欢想一些奇怪的东西。</p>
					</div>
					<button class="continue">继续阅读</button>
					<div v-if="!showArticle" class="show-more">
						<i @click="showArticle = true" class="iconfont icon-weixin"></i>
					</div>
				</section>
			</article>
		</scroll-view>

		<footer class="f-align-l f-s-b">
			<button class="share f-dir-column f-10 c-9 t-a-c" open-type='share'>
				<i class="iconfont icon-weixin"></i>
				分享给好友
			</button>
			<div class="f-align-l btn">
				<button>加入书架</button>
				<button @click="$router.push('/pages/readPage/index')">立即阅读</button>
			</div>
		</footer>
	</div>
</template>

<script>
	import t from '@/utils/throttle'
	import Comment from '@/components/Comment.vue'
	import LoadSection from '@/components/LoadSection.vue'

	export default {
		components: {
			Comment,
			LoadSection
		},
		data() {
			return {
				mainImg: '',
				colors: [],
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
				listShow: true,
			  navShow: false,
				doScroll: null,
				showArticle: false,
				descShow: false,
				statusBarHeight: 20,
				desc: '我不ds是猪啊,13我真的不30213是猪啊啊,啊我不是猪14啊我真的不是猪,啊啊啊我!不是猪啊我真的不，是猪啊啊啊我。不是猪啊我真的不是猪啊啊啊我不是猪啊我真的不是猪啊啊啊我不是猪啊我真的不是猪啊啊啊我不是猪啊我真的不是猪啊啊啊'
			}
		},
		created () {
			this.$api.getColor().then(res => {
				console.log(res)
				this.mainImg = res.mainImg
				this.colors = res.colors
			})
			Megalo.getSystemInfo().then(res => {
				this.statusBarHeight = res.statusBarHeight
			})
		},
		onShow () {
			const query = Megalo.createSelectorQuery();
			console.log(query)
			query.select('#detail-container').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(function (res) {
				console.log(res)
			})
			this.doScroll = t(this.handleScroll, 50)
		},
		methods:{
			loginWx() {
				Megalo.login().then(res => {
					// Megalo.getUserInfo().then(res => console.log(res))
					this.$api.loginWx({
						code: res.code
					}).then(res => {
						console.log(res)
					})
				})
			},
			handleScroll (e) {
				if (e.detail.scrollTop > 150) {
					this.navShow = true
				} else {
          this.navShow = false
				}
			},
			showList () {
				this.listShow = true
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
	.mr-9 {
		margin-right: 9px;
	}

	.book-detail {
		position: absolute;
		width: 100%;
		height: 100%;
		.nav {
			position: fixed;
			top: 0;
			height: 70px;
			width: 100%;
			text-align: center;
			/*background: rgb(30, 32, 55);*/
			color: #fff;
			display: none;
			opacity: 0;
			transition: all ease-in .15s;
			z-index: 2222;
			&.show {
				display: block;
				opacity: 1;
			}
			i {
				position: absolute;
				left: 16px;
			}
		}
		.list {
			font-size: 17px;
			color: #000;
			.content {
				padding-left: 16px;
				height: 100%;
			}
			.title {
				height: 36px;
				line-height: 36px;
			}
			.section {
				line-height: 28px;
				padding: 8px;
			}
		}
		.list /deep/ {
			.van-popup, ._van-popup {
				width: 80% !important;
				margin-top: 70px;
			}
			.van-overlay {
				position: absolute;
				height: 100%;
				width: 100%;
			}
		}

	}
	.main {
		position: relative;
		height: calc(100% - 56px);
		overflow: auto;
		.head-back {
			position: fixed;
			height: 70px;
			width: 100%;
			padding-left: 16px;
			line-height: 70px;
		}

	}
	.book-bg {
		position: relative;
		width: 100%;
		height: 317px;
		/*background-color: rgba(36,38,59, .8);*/
		-webkit-background-size: 100%;
		background-size: 100%;
		padding-top: 54px;
		color: #fff;
		text-align: center;
		overflow: hidden;
		.bg {
			overflow: hidden;
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: -1;
			background-size: 100% 100%;
			filter: blur(20px);
			overflow: hidden;
		}
		.dot {
			display: inline-block;
			height: 4px;
			width: 4px;
			background-color: #777;
			border-radius: 5px;
			margin: 0 10px;
		}
		img {
			position: relative;
			width: 97px;
			height: 126px;
			left: 50%;
			transform: translateX(-50%);
			margin-bottom: 8px;
		}
		.title {
			font-size: 22px;
			line-height: 40px;
		}
		.extra {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 65px;
			background-color: rgba(30, 32, 55, .8)
		}
		.item {
			width: 33.3%;
			text-align: center;
			font-size: 12px;
			span {
				font-size: 16px;
				font-weight: 700;
			}
		}
	}
	.desc {
		font-size: 16px;
		color: #3b3f48;
		/*height: 92px;*/
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-height: 23px;
		margin: 12px 16px;
		&.show-all {
			display: block;
			min-height: 92px;
			overflow: auto;
		}
		.open {
			color: #657fca;
			margin-left: 12px;
		}
	}
	.catalogue {
		height: 56px;
		line-height: 56px;
		padding: 16px;
		.latest {
			height: 30px;
			line-height: 30px;
			max-width: 230px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 14px;
			color: #9fa2ab;
		}
		i {
			font-size: 25px;
		}
	}
	.comments {
		h2 {
			padding-left: 16px;
			color: #404145;
			margin-top: 22px;
			font-size: 18px;
			line-height: 100%;
		}
	}
	.pre-read {
		position: relative;
		background: #f6f7fb;
		padding: 0 16px;
		color: #3c3f46;
		height: 478px;
		overflow: hidden;
		&.show {
			min-height: 478px;
			height: auto;
		}
		h3 {
			font-size: 21px;
			line-height: 48px;
		}
		p {
			text-indent: 30px;
			font-size: 18px;
			line-height: 28px;
		}
		.continue {
			width: 80px;
			font-size: 15px;
			height: 35px;
			line-height: 35px;
			margin: 60px auto;
		}
		.icon {
			display: inline-block;
			width: 62px;
			height: 22px;
			line-height: 22px;
			font-size: 12px;
			border-radius: 0 0 10px 10px;
			text-align: center;
			color: #fff;
			background: linear-gradient(#32353c, rgba(50, 53, 60, .8)); /* 标准的语法 */
		}
		.show-more {
			position: absolute;
			bottom: 0;
			left: 0;
			background: red;
			height: 150px;
			width: 100%;
			background: linear-gradient(transparent, rgba(246, 247, 251, .8), #f6f7fb, #f6f7fb); /* 标准的语法 */
			text-align: center;
			padding-top: 100px;
			i {
				font-size: 25px;
				color: #3c3f46;
			}
		}
	}
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 58px;
		background: #fff;
		box-shadow: 8px 0 10px rgba(57, 74, 113, 0.05);
		padding: 0 16px 0 22px;
		i {
			color: #000;
			font-size: 20px;
		}
		.share {
			outline: none;
			background: none;
			border: none;
			box-shadow: none;
			height: 34px;
			line-height: 1;
			&:after{
				border: none;
			}
		}
		.btn {
			button {
				width: 83px;
				height: 34px;
				border-radius: 34px;
				line-height: 34px;
				border: none;
				font-size: 15px;
				&:first-child {
					background: #ffd3d8;
					color: #fa1510;
					margin-right: 7px;
				}
				&:last-child {
					background: #f95c53;
					color: #fff;
				}
			}
		}
	}
</style>
