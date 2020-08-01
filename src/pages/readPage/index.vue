<template>
	<div class="reading" v-if="chapter">
		<nav class="nav f-align-l"
		     :style="{'padding-top': statusBarHeight + 'px', background: status.navBg, color: status.navColor }">
			<i class="back iconfont icon-fanhui" @click="back"></i>{{chapter.title}}
		</nav>
		<section class="content"
		         :style="{background: status.bg, color: status.color, fontSize: fontConfig.fontSize + 'rpx'}"
		         @longpress="handleLongpress" @tap="hideOperation">
			<ul class="f-align opeartion van-hairline--surround">
				<li class="f-align" @click="pre"><i class="iconfont icon-jiantouzuo"></i>{{nowCount > 0 ? '上一章' : '没有咯'}}</li>
				<li class="f-align border" @click="listShow = !listShow"><i class="iconfont icon-sort"></i>目录</li>
				<li class="f-align" @click="next">{{nowCount < total ? '下一章' : '没有咯'}}<i
						class="iconfont icon-icon_arrow_right"></i></li>
			</ul>
			<h1>{{chapter.title}}</h1>
			<div class="text">
				<p v-html="chapter.content"></p>
			</div>
			<div class="comment-box" :style="{background: status.operationBg, color: status.color}">
				<Comment v-for="(item, index) in hotComment" :comment="item" :key="index" :imgSize="60"/>
				<p class="line-height70" v-if="!isLoading && hotComment.length === 0">还没有评价哦 赶快抢个沙发吧‘(*>﹏<*)′</p>
				<p class="comment-a f-align-r" @click="comment"><i class="iconfont icon-pinglun"></i>去评论</p>
				<ul class="f-align opeartion van-hairline--surround mtb-20">
					<li class="f-align" @click="pre"><i class="iconfont icon-jiantouzuo"></i>{{nowCount > 0 ? '上一章' : '没有咯'}}</li>
					<li class="f-align border" @click="listShow = !listShow"><i class="iconfont icon-sort"></i>目录</li>
					<li class="f-align" @click="next">{{nowCount < total ? '下一章' : '没有咯'}}<i
							class="iconfont icon-icon_arrow_right"></i></li>
				</ul>
			</div>
		</section>
		<van-popup
				class="list"
				:style="{color: status.color}"
				:show="listShow"
				position="left"
				@close="listShow = false"
		>
			<div class="book-info f-align-l" :style="{background: status.listTitleBg}"
			     @click="$router.replace({path: '/pages/bookDetail/index?bookId=' + $route.query.bookId})">
				<img class="img" :src="decodeURIComponent($route.query.mainImg)"/>
				<div class="f-g-1">
					<h3>{{$route.query.title}}</h3>
					<p>{{$route.query.author}}</p>
				</div>
				<i class=" back iconfont icon-icon_arrow_right"></i>
			</div>
			<LoadSection :height="'calc(100% - 314rpx)'" @toRead="toRead" :showChapterNum="nowCount" noBorder
			             :color="[status.color, status.listBg]" class="load-box" @loading="loading"
			             :sectionList="sectionList"/>
		</van-popup>
		<footer v-show="operationShow" :style="{background: status.operationBg, color: status.color}">
			<div>
				<h2 class="f-align">{{bottomChapter.title}}</h2>
				<div class="f-align">
					<i class=" pre iconfont icon-jiantouzuo" @click="pre"></i>
					<van-slider class="f-g-1" use-button-slot :inactive-color="status.barBg" :active-color="status.activeBarBg"
					            :min="1 / total" :value="(nowCount / total.toFixed(2) * 100)" @change="sectionChange">
						<div class="custom-button" :style="{background: status.activeBarBg}" slot="button">
						</div>
					</van-slider>
					<i class=" next iconfont icon-icon_arrow_right" @click="next"></i>
				</div>
				<ul class="f-align" :style="{}">
					<li class="f-dir-column f-align" @click="catalogue">
						<i class="back iconfont icon-sort"></i>
						<span :style="{color: status.color}">目录</span>
					</li>
					<li class="f-dir-column f-align" @click="night">
						<i class=" back iconfont " :class="[isDark ? 'icon-rijianmoshi' : 'icon-yejian']"></i>
						<span :style="{color: status.color}">{{isDark ? '日间' : '夜间'}}</span>
					</li>
					<li class="f-dir-column f-align" @click="setting">
						<i class=" back iconfont icon-shezhi"></i>
						<span :style="{color: status.color}">设置</span>
					</li>
				</ul>
			</div>
		</footer>
		<footer v-show="settingShow" class="setting" :style="{background: status.operationBg, color: status.color}">
			<div>
				<div class="f-align fontsize">
					<i class=" pre iconfont icon-yueduye_zitijianxiao" @click="fontSizeChange(0)"></i>
					<van-slider class="f-g-1" use-button-slot :inactive-color="status.barBg" :active-color="status.activeBarBg"
					            :value="fontConfig.progressValue" @drag="fontChangeHandler">
						<div class="custom-button" :style="{background: status.activeBarBg}" slot="button">
						</div>
					</van-slider>
					<i class=" next iconfont icon-yueduye_zitizengda" @click="fontSizeChange(1)"></i>
				</div>
				<div class="f-align">
					<i class=" pre iconfont icon-brightj2" @click="nowCount--"></i>
					<van-slider class="f-g-1" use-button-slot :inactive-color="status.barBg" :active-color="status.activeBarBg"
					            :value="brightness * 100" @drag="brightnessChange">
						<div class="custom-button" :style="{background: status.activeBarBg}" slot="button">
						</div>
					</van-slider>
					<i class=" next iconfont icon-bright1" @click="nowCount++"></i>
				</div>
			</div>
		</footer>
		<van-toast id="van-toast"/>
	</div>
</template>

<script>
  import LoadSection from '@/components/LoadSection.vue'
  import Comment from '@/components/Comment.vue'
  
  const config = {
    minFontSize: 18,
    fontSize: 36,
    maxFontSize: 54
  }
  
  export default {
    components: {
      LoadSection,
      Comment
    },
    data() {
      return {
        chapter: null,
        bottomChapter: null,
        isDark: false,
        bookId: null,
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
        total: Infinity,
        nowCount: 0,
        fontConfig: {
          minFontSize: 18,
          fontSize: 36,
          maxFontSize: 54,
          progressValue: 50,
          default: 36
        },
        brightness: 0.5,
        readConfig: {
          fontDefaultCount: 50,
        },
        statusBarHeight: 20,
        listShow: false,
        operationShow: false,
        settingShow: false,
        sectionList: [],
        hotComment: [],
        timeout: null,
        isLoading: false,
        fontChangeHandler: () => null,
        fChangeTimer: null,
        startTime: null,
        readTime: 0,
        readCount: 1,
        readCountTimer: null
      }
    },
    beforeCreate() {
      Megalo.getSystemInfo().then(res => {
        this.statusBarHeight = res.statusBarHeight
      })
      Megalo.getScreenBrightness().then(res => this.brightness = res.value)
    },
    async created() {
      // var appInstance = getApp()
      // console.log(appInstance.globalData.then()) // I am global data
      
      this.fontChangeHandler = this.$utils.throttle(this.fontChange, 80)
      const res = await this.init(this.$route.query.chapterId)
      if (res) {
        const chapters = await this.$api.getChapterList({
          bookId: this.chapter.bookId,
          pageNo: 1,
          pageSize: this.chapter.chapterNum + 300
        })
        if (chapters.status === 200) {
          console.error(chapters.data.totalCount, this.total)
          this.total = chapters.data.totalCount - 1
          this.sectionList = chapters.data.chapterList
        }
      }
    },
    // onHide() {
    //   console.error('hide')
    // 	this.readTime += new Date().getTime() - this.startTime
    // },
    onUnload() {
      const {bookId} = this.chapter
      console.error(bookId)
      this.$utils.bev.addbev(bookId, 2, this.readCount)
      this.$utils.bev.addbev(bookId, 3, new Date().getTime() - this.startTime)
      const {isSub} = this.$route.query
      if (isSub) {
        const {bookId} = this.$route.query
        this.$api.lastRead({
          bookId: bookId || this.bookId,
          chapterId: this.chapter._id,
          title: this.chapter.title
        }).then(res => {
          console.log(res)
        })
      }
      
    },
    onShow() {
      this.getCommentHot(this.chapter ? this.chapter._id : this.$route.query.chapterId)
      this.startTime = new Date().getTime()
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      toRead(chapter) {
        this.init(chapter._id)
        this.getCommentHot(chapter._id)
      },
      async init(chapterId) {
        this.bookId = this.$route.query.bookId
        const res = await this.$api.getChapter({chapterId})
        if (res.status === 200) {
          this.chapter = res.data
          this.bottomChapter = res.data
          this.nowCount = res.data.chapterNum
          setTimeout(() => Megalo.pageScrollTo({
            scrollTop: 78
          }), 100)
          this.listShow = false
          return true
        } else {
          this.$toast.fail(res.message)
        }
      },
      async getCommentHot(chapterId) {
        const comment = await this.$api.chapterComment({
          chapterId,
          pageNo: 1,
          pageSize: 3
        })
        if (comment.status === 200) {
          this.hotComment = comment.data.result
        }
      },
      async getChapter(chapterId) {
        this.isLoading = true
        const res = await this.$api.getChapter({chapterId})
        if (res.status === 200) {
          this.chapter = res.data
          this.nowCount = res.data.chapterNum
          this.isLoading = false
          Megalo.pageScrollTo({
            scrollTop: 78
          })
          return true
        } else {
          this.$toast.fail(res.message)
          this.isLoading = false
          return false
        }
      },
      comment() {
        this.$router.push({
          path: '/pages/comment/index',
          query: {chapterId: this.chapter._id, chapterName: this.chapter.title, bookId: this.chapter.bookId}
        })
      },
      catalogue() {
        this.operationShow = false
        this.listShow = true
      },
      night() {
        this.status = this.isDark ? {
          navBg: '#f7f8fc',
          navColor: '#000',
          color: '#404040',
          bg: '#f3f3f3',
          operationBg: '#ffffff',
          activeBarBg: '#3b3e47',
          barBg: '#e5e5e5',
          listBg: '#fff',
          listTitleBg: '#f2f2f2'
        } : {
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
        this.isDark = !this.isDark
      },
      async sectionChange(e) {
        if (this.isLoading) return
        if (this.timeout) clearTimeout(this.timeout)
        const count = Math.floor(e.detail * (this.total - 1) / 100)
        this.nowCount = count
        this.bottomChapter = this.sectionList[count]
        this.timeout = setTimeout(async () => {
          await this.getChapter(this.sectionList[count]._id)
          await this.getCommentHot(this.sectionList[count]._id)
        }, 100)
      },
      async pre() {
        if (this.isLoading) return
        if (this.timeout) clearTimeout(this.timeout)
        if (this.nowCount === 0) return
        const count = this.nowCount - 1
        this.nowCount = count
        this.bottomChapter = this.sectionList[count]
        this.timeout = setTimeout(async () => {
          await this.getChapter(this.sectionList[count]._id)
          await this.getCommentHot(this.sectionList[count]._id)
        }, 100)
      },
      async next() {
        if (this.isLoading) return
        this.timeout && clearTimeout(this.timeout)
        if (this.nowCount >= this.totalCount - 1) return
        const count = this.nowCount + 1
        this.nowCount = count
        this.bottomChapter = this.sectionList[count]
        this.timeout = setTimeout(async () => {
          await this.getChapter(this.sectionList[count]._id)
          await this.getCommentHot(this.sectionList[count]._id)
        }, 100)
      },
      setting() {
        this.operationShow = false
        this.settingShow = true
      },
      fontChange(e) {
        const diff = (e.detail.value - 50) * (this.fontConfig.maxFontSize - this.fontConfig.minFontSize) / 100
        const fs = Math.round(diff + this.fontConfig.default)
        this.$set(this.fontConfig, 'fontSize', fs)
        this.$set(this.fontConfig, 'progressValue', e.detail.value)
      },
      fontSizeChange(type) {
        this.fChangeTimer && clearTimeout(this.fChangeTimer)
        let fs = this.fontConfig.fontSize
        if ((fs === this.fontConfig.minFontSize && type === 0) || (fs === this.fontConfig.maxFontSize && type === 1)) return
        this.fChangeTimer = setTimeout(() => {
          if (type) { // 变大
            fs += 2
          } else {
            fs -= 2
          }
          const pValue = (fs - this.fontConfig.minFontSize) / (this.fontConfig.maxFontSize - this.fontConfig.minFontSize) * 100
          this.$set(this.fontConfig, 'fontSize', fs)
          this.$set(this.fontConfig, 'progressValue', pValue)
        }, 100)
      },
      brightnessChange(e) {
        Megalo.setScreenBrightness({
          value: Math.round(e.detail.value * 100) / 10000
        })
      },
      handleLongpress() {
        this.operationShow = true
      },
      hideOperation() {
        this.operationShow = false
        this.settingShow = false
      },
      loading() {
        const count = this.sectionList.length
        if (count >= this.total || !this.bookId) return
        this.$api.getChapterListMore({
          bookId: this.bookId,
          num: this.sectionList.length - 1,
          size: 300
        }).then(res => {
          if (res.status === 200) {
            this.sectionList.push(...res.data.chapterList)
          }
        })
      }
    },
    watch: {
      nowCount(val) {
        if (this.readCountTimer) {
          clearTimeout(this.readCountTimer)
        } else {
          this.readCountTimer = setTimeout(() => {
            this.readCount += 1
          }, 15000)
        }
        const count = this.sectionList.length
        if (count >= this.total || !this.bookId) return
        this.$api.getChapterListMore({
          bookId: this.bookId,
          num: count - 1,
          size: this.total
        }).then(res => {
          if (res.status === 200) {
            this.sectionList.push(...res.data.chapterList)
          }
        })
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
		padding-top: 20px;
		position: relative;
		
		h1 {
			padding: 38px 20px 26px;
			font-size: 23px;
			line-height: 100%;
		}
		
		.text {
			padding: 0 30px 50px;
			
			p {
				line-height: 33px;
				text-indent: 36px;
			}
			
		}
		
		color: #404040;
	}
	
	.nav {
		position: fixed;
		top: 0;
		height: 70px;
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
		padding: 20px 32px 0;
		
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
			
			.img {
				border: 1px solid #d9d9d9;
				height: 55.5px;
				width: 41.8px;
				margin-right: 13px;
				background-size: 41.8px 55.5px;
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
				margin-top: 70px;
			}
			
			.van-overlay {
				position: absolute;
				height: 100%;
				width: 100%;
			}
		}
	}
	
	
	.opeartion {
		height: 40px;
		border-radius: 3px;
		width: 90%;
		margin: 0 auto;
		box-shadow: 0 0 15px rgba(57, 74, 113, 0.02);
		
		li {
			width: 33%;
			font-size: 12px;
			height: 20px;
			
			i {
				margin: 0 2px;
				font-size: 12px;
				transform: translateY(1px);
			}
			
			&.border {
				border-left: 1px solid rgba(153, 153, 153, 0.32);
				border-right: 1px solid rgba(153, 153, 153, 0.32);
			}
		}
	}
	
	.comment-box {
		border-radius: 8px 8px 0 0;
		padding: 0 21px 10px 30px;
		min-height: 50px;
		box-shadow: 8px 0 10px rgba(57, 74, 113, 0.05);
		
		.commit {
			padding-left: 0;
			padding-right: 0;
		}
		
		.comment-a {
			margin-top: 8px;
			text-align: right;
			font-size: 14px;
			color: #666;
			
			i {
				margin-right: 5px;
				font-size: 16px;
			}
		}
	}
	
	footer {
		height: 142px;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		box-shadow: 0 -2px 15px rgba(0, 0, 0, .1);
		
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
	
	
	.mtb-20 {
		margin: 20px auto;
	}
	
	.line-height70 {
		line-height: 100px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
</style>

<style>
	.octoParse-p {
		line-height: 33px;
		text-indent: 36px;
	}
</style>
