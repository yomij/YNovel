<template>
	<div class="comment-box">
		<van-toast id="van-toast"/>
		<nav class="nav f-align" :style="{'padding-top': statusBarHeight * 2  + 'rpx'}">
			<i class=" back iconfont icon-fanhui" @click="$router.go(-1)"></i>
			<div class="f-dir-column">
				<p>{{}}章评</p>
				<p class="total">{{totalCount}}条</p>
			</div>
		</nav>
		<!--bindscrolltoupper="upper"-->
		<!--bindscrolltolower="lower"-->
		<!--scroll-into-view="{{toView}}"-->
		<!--scroll-top="{{scrollTop}}"-->
		<scroll-view
				class="scroll"
				scroll-y
				
				:lower-threshold="100"
				@scroll="scroll"
				@scrolltolower="scrolltolower"
		>
			<Comment v-for="(item, index) in comments" :key="index" :comment="item"/>
			<p class="line-height70" v-if="!isLoading && comments.length === 0">还没有评价哦 赶快抢个沙发吧‘(*>﹏<*)′</p>
		</scroll-view>
		<footer>
			<p @click="boxShow = true">发表评论</p>
		</footer>
		<van-popup
				class="cbox"
				:show="boxShow"
				position="bottom"
				@close="boxShow = false"
		>
			<!--<textarea-->
			<!--fixed="true"-->
			<!--:adjust-position="true"-->
			<!--:show-confirm-bar="false"-->
			<!--:cursor-spacing="300"-->
			<!--placeholder="placeholder颜色是红色的"-->
			<!--placeholder-style="color:red;"/>-->
			<form @submit="commentSubmit">
				<div class="operation f-s-b">
					<i class=" back iconfont icon-close" @click="boxShow = false"></i>
					<p class="f-g-1">发表评论</p>
					<button class='sub' form-type="submit">提交</button>
				</div>
				
				
				<textarea
						name="content"
						class="area"
						fixed="true"
						:adjust-position="true"
						:show-confirm-bar="false"
						placeholder="最多不超过150字哦"
						placeholder-style="color:#777;"
						style="-webkit-user-select:auto;"
						contenteditable="true"
						type="text"
						@focus="focus"
						:value="content"
				></textarea>
			</form>
		</van-popup>
		<van-toast id="van-toast"/>
	</div>
</template>


<script>
  import Comment from '@/components/Comment.vue'
  
  export default {
    components: {
      Comment
    },
    data() {
      return {
        statusBarHeight: 20,
        scrollHeight: 250,
        boxShow: false,
        comments: [],
        totalCount: 0,
        content: '',
        isLoading: false,
        pageNo: 1,
        pageSize: 10
      }
    },
    async created() {
      const res = Megalo.getSystemInfo()
      this.statusBarHeight = res.statusBarHeight
      this.scrollHeight = res.screenHeight - 90 - 52 - this.statusBarHeight
      this.isLoading = true
      this.$toast.loading('加载中')
      const comment = await this.$api.chapterComment({
        chapterId: this.$route.query.chapterId,
        pageNo: 1,
        pageSize: 10,
        type: 1
      })
      if (comment.status === 200) {
        this.comments = comment.data.result
        this.totalCount = comment.data.totalCount
        this.pageNo += 1
        this.$toast.clear()
      } else {
        this.$toast.clear()
        this.$toast.fail(res.message)
      }
      
      this.isLoading = false
    },
    methods: {
      // scroll (e) {
      //   // console.log(e)
      // },
      scrolltolower(e) {
        this.getData()
      },
      focus(e) {
        console.log(e)
      },
      inputText(e) {
        this.content = e.detail.value
      },
      getData(type = 1) {
        if ((this.pageNo - 1) * this.pageSize > this.totalCount) return
        if (this.isLoading) return
        this.isLoading = true
        this.$api.chapterComment({
          chapterId: this.$route.query.chapterId,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          type
        }).then(comment => {
          if (comment.status === 200) {
            this.pageNo += 1
            this.comments.push(...comment.data.result)
            this.totalCount = comment.data.totalCount
          }
          this.isLoading = false
        })
      },
      commentSubmit(e) {
        const content = e.detail.value.content
        if (!content) {
          return this.$toast.fail('请输入内容')
        }
        const {bookId, chapterId} = this.$route.query
        this.$api.addChapterComment({
          bookId,
          chapterId,
          content: content
        }).then(res => {
          if (res.status === 200) {
            this.comments.unshift(res.data)
            this.boxShow = false
            this.content = ''
            this.totalCount += 1
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
	.comment-box {
		position: absolute;
		width: 100%;
		height: 100%;
		padding-top: 70px;
		padding-bottom: 52px;
		color: #333;
	}
	
	.scroll {
		height: 100%;
	}
	
	.nav {
		position: fixed;
		top: 0;
		height: 70px;
		width: 100%;
		text-align: center;
		/*background: rgb(30, 32, 55);*/
		color: #333;
		background-color: #fff;
		display: none;
		transition: all ease-in .15s;
		z-index: 2222;
		
		.total {
			font-size: 11px;
			color: #777;
		}
		
		i {
			position: absolute;
			left: 16px;
		}
	}
	
	.cbox /deep/ {
		position: fixed;
		
		.van-popup, ._van-popup {
			border-radius: 8px 8px 0 0;
			height: 315px !important;
			margin-top: 70px;
		}
		
		.van-overlay {
			position: absolute;
			height: 100%;
			width: 100%;
		}
		
		textarea {
			box-sizing: border-box;
			padding: 18px;
			margin-top: 56px;
			margin-bottom: 52px;
			height: 250px;
			position: absolute;
			top: 0;
			width: 100%;
			font-size: 15px;
			background-color: #fff;
		}
		
		.operation {
			z-index: 10000;
			padding: 18px 20px;
			color: #38393e;
			
			span {
				color: #bfc3e8;
			}
			
			p {
				font-size: 15px;
				text-align: center;
			}
			
			.sub {
				color: #bfc3e8;
				background: none;
				font-size: 15px;
				border: none;
				
				&:after {
					display: none;
				}
			}
		}
		
		.bottom {
			height: 52px;
			position: absolute;
			bottom: 0;
		}
	}
	
	footer {
		height: 52px;
		padding: 8px 18px;
		
		p {
			border-radius: 4px;
			padding-left: 10px;
			font-size: 15px;
			color: #a1a5a8;
			height: 36px;
			line-height: 36px;
			background-color: #f4f8fb;
		}
	}
	
	.line-height70 {
		line-height: 200px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}

</style>
