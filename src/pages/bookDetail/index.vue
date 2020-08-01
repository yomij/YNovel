<template>
	<div class="book-detail" v-if="book">
		<van-toast id="van-toast"/>
		<nav class="nav f-align" :class="{show: navShow || listShow}"
		     :style="{'padding-top': statusBarHeight * 2  + 'rpx', 'background-color': colors[2]}">
			<i class=" back iconfont icon-fanhui" :style="{color: book.mainImg.isDark ? '#fff' : '#555'}" @click="back"></i>{{book.title}}
		</nav>
		<van-popup
				class="list"
				:show="listShow"
				position="left"
				@close="listShow = false"
		>
			<LoadSection @toRead="toRead" @loading="loading" :sectionList="sectionList"/>
		</van-popup>
		<scroll-view
				class="main" id="detail-container"
				scroll-y
				@scroll="doScroll"
		>
			<div class="head-back f-align-l" :style="{'padding-top': statusBarHeight + 'px'}">
				<i class="iconfont icon-fanhui" :style="{color: book.mainImg.isDark ? '#fff' : '#555'}" @click="back"></i>
			</div>
			<!--<div v-for="c in colors" :style="{background: c, height: '50px', width: '50px'}"></div>-->
			<div class="book-bg" :style="{'background-color': colors[0], color: book.mainImg.isDark ? '#fff' : '#555'}">
				<div class="bg" :style="{'background-image': 'url(' + mainImg + ')', 'background-color': color}"></div>
				<img :src="book.mainImg.url"/>
				<p class="title">{{book.title}}</p>
				<p class="f-12">{{book.author}}<span class="dot"
				                                     :style="{'background-color': book.mainImg.isDark ? '#fff' : '#555'}"></span>{{book.mainTag}}
				</p>
				<div class="extra f-align" :style="{'background-color': colors[1]}">
					<div class="item">
						<span>{{(book.totalCount / 10000).toFixed(0)}}</span>万字<br/>{{book.status ? '连载' : '完结'}}
					</div>
					<div class="item">
						<span>{{book.heat.toFixed(0)}}</span><br/>热度
					</div>
					<div class="item">
						<span>{{book.gradeCount > 10 ? (book.gradeTotal / book.gradeCount).toFixed(2) : '4.5' }}</span>分<br/>
						{{book.gradeCount > 10 ? book.gradeCount : 10}}人评价
					</div>
				</div>
			</div>
			<p class="desc" :class="{'show-all': descShow}">
				{{(book.description.length > 66 && !descShow) ? book.description.substr(0, 66) : desc}}
				<span><span v-if="book.description.length > 66 && !descShow">...</span><span class="open"
				                                                                             @click="descShow = !descShow">{{descShow ? '收起' :  '展开'}}</span></span>
			</p>
			<div class="catalogue van-hairline--top-bottom f-s-b">
				<div class="f-align-l f-18"><i class="iconfont icon-sort mr-9 f-16"></i>目录</div>
				<p class="latest" @click="showList"><span class="mr-9">{{book.latestUpdate}}</span>{{book.latestUpdateName}}</p>
				<i class="iconfont icon-youjiantou1 f-18"></i>
			</div>
			<section class="comments">
				<h2>精彩评论</h2>
				<Comment v-for="(item, index) in commentList" :key="index" :comment="item" :showChapter="true"/>
			</section>
			<article class="pre-read" :class="{show: showArticle}">
				<i class="icon">章节试读</i>
				<section>
					<h3>{{firstChapter.title}}</h3>
					<div v-html="firstChapter.content">
					</div>
					<button class="continue">继续阅读</button>
					<div v-if="!showArticle" class="show-more">
						<i @click="showArticle = true" class="iconfont icon-ico_open"></i>
					</div>
				</section>
			</article>
		</scroll-view>
		
		<footer class="f-align-l f-s-b">
			<button class="share f-dir-column f-10 c-9 t-a-c" open-type='share' @click="share">
				<i class="iconfont icon-fenxiang"></i>
				分享给好友
			</button>
			<div class="f-align-l btn">
				<button :class="{subscription: isSubscriptions }" @click="subscription">{{isSubscriptions ? '已在书架' : '加入书架'}}
				</button>
				<button @click="$router.push({path: '/pages/readPage/index', query: {chapterId: sectionList[0]._id}})">立即阅读
				</button>
			</div>
		</footer>
	</div>
</template>

<script>
  import t from '@/utils/throttle'
  import dateAgo from '@/utils/dateAgo'
  import Comment from '@/components/Comment.vue'
  import LoadSection from '@/components/LoadSection.vue'
  
  export default {
    components: {
      Comment,
      LoadSection
    },
    data() {
      return {
        book: null,
        mainImg: '',
        colors: [],
        firstChapter: null,
        sectionList: [],
        listShow: false,
        navShow: false,
        doScroll: null,
        showArticle: false,
        descShow: false,
        statusBarHeight: 20,
        desc: '',
        pageNo: 1,
        pageSize: 50,
        totalCount: Infinity,
        isSubscriptions: false,
        commentList: [],
        shareTimes: 0
      }
    },
    created() {
      const token = Megalo.getStorageSync('authorization')
      const bookId = this.$route.query.bookId
      this.$api.getBook({
        token,
        bookId
      }).then(res => {
        if (res.status !== 200) return
        const book = res.data.book
        book.latestUpdate = dateAgo(new Date(book.latestUpdate))
        this.book = book
        this.firstChapter = res.data.firstChapter
        this.colors = this.book.mainImg.colors
        this.commentList = res.data.comment.result
        // if(getApp().globalData.bookList.some(item => item.book._id === bookId)) {
        //   this.isSubscriptions = true
        // }
        this.isSubscriptions = res.data.isSubscription
        // 点击
        this.$utils.bev.addbev(book._id, 1, 1)
        return this.$api.getChapterList({
          bookId: this.book._id,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
      }).then(res => {
        this.sectionList = res.data.chapterList
        this.totalCount = res.data.totalCount
      })
      // this.$api.getColor().then(res => {
      // 	console.log(res)
      // 	this.mainImg = res.mainImg
      // 	this.colors = res.colors
      // })
      Megalo.getSystemInfo().then(res => {
        this.statusBarHeight = res.statusBarHeight
      })
    },
    onShow() {
      const query = Megalo.createSelectorQuery();
      console.log(query)
      query.select('#detail-container').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        console.log(res)
      })
      this.doScroll = t(this.handleScroll, 50)
    },
    onUnload() {
      if (this.shareTimes) {
        this.$utils.bev.addbev(this.book._id, 4, this.shareTimes)
      }
    },
    onShareAppMessage(res) {
      return {
        title: this.book.title,
        path: '/pages/bookDetail/index?bookId=' + this.book._id,
      }
    },
    methods: {
      back() {
        const scen = wx && wx.getLaunchOptionsSync()
        if (scen && scen.scene === 1007) {
          this.$router.reLaunch('/pages/bookStore')
        } else {
          this.$router.go(-1)
        }
        
      },
      toRead(chapter) {
        this.$router.push({
          path: '/pages/readPage/index',
          query: {
            chapterId: chapter._id,
            title: this.book.title,
            bookId: this.book._id,
            mainImg: encodeURIComponent(this.book.mainImg.url),
            author: this.book.author,
            isSub: this.isSubscriptions
          }
        })
      },
      share(book) {
        this.shareTimes += 1
      },
      handleScroll(e) {
        if (e.detail.scrollTop > 150) {
          this.navShow = true
        } else {
          this.navShow = false
        }
      },
      showList() {
        this.listShow = true
      },
      loading() {
        if (this.totalCount < this.pageSize * this.pageNo) return
        this.pageNo += 1
        this.$api.getChapterList({
          bookId: this.book._id,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }).then(res => {
          this.sectionList.push(...res.data.chapterList)
          console.log('load', res, this.sectionList)
        })
        
      },
      subscription() {
        if (this.isSubscriptions) return
        this.$api.subscription({
          bookId: this.book._id
        }).then(res => {
          if (res.status === 200) {
            this.isSubscriptions = true
          } else {
            this.$toast.fail(res.message)
          }
        })
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
			/*background-color: #777;*/
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
			margin-top: 5px;
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
				font-size: 16px;
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
			
			i {
				font-size: 16px;
				margin-bottom: 4px;
			}
			
			&:after {
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
			
			.subscription {
				background: #d9d9d9 !important;
				color: #4a5369 !important;
			}
		}
	}
</style>

<style>
	.octoParse-p {
		text-indent: 30px;
		font-size: 18px;
		line-height: 28px;
	}
</style>
