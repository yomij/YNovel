<template>
	<div class="recommend">
		<!--<Ysearch />-->
		<van-toast id="van-toast"/>
		<Search @transShow="searchShow = false" :show="searchShow"/>
		<div class="f-align-l search" @click="searchShow = true">
			<i class="iconfont icon-yonghu"></i>
			<p>{{'搜索'}}</p>
		</div>
		<div class="main">
			<article class="book-box" v-for="(book, index) in bookList" @click="$router.push('/pages/bookDetail/index?bookId=' + book._id)">
				<div class="f-align-l base">
					<img :src="book.mainImg.url"/>
					<div claass="info">
						<p class="title">{{book.title}}</p>
						<p>{{book.author}}<span class="dot"></span>{{book.mainTag}}</p>
						<p>{{book.status ? '完结' : '连载'}}<span class="dot"></span>{{(book.totalCount / 10000).toFixed(0)}}万字<span class="dot"></span>评分{{book.gradeCount > 10 ? (book.gradeTotal / book.gradeCount).toFixed(2) : '4.5' }}</p>
					</div>
				</div>
				<p class="introduce">{{book.description ? book.description : '这本书需要自己去探索哦'}}</p>
				<p class="reason">-&nbsp;推荐&nbsp;-</p>
				<div class="operation f-align">
					<button class="share f-dir-column f-10 c-9 t-a-c" @click.stop="choose(book)" open-type='share'>
						<i class="iconfont icon-fenxiang"></i>
					</button>
					<i class="iconfont icon-iconfontzhizuobiaozhun023108" :class="{'c-9': book.isSub}"  @click.stop="subscription(book, index)"></i>
					<button class="read" @click.stop="toRead(book)">立即阅读</button>
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
	"navigationBarTitleText": "推荐",
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
			Search: Ysearch
		},
		data() {
			return {
			  bookList: [],
				chooseBook: {}.constructor,
        searchShow: false,
			}
		},
		beforeCreate() {
			console.log('Page [hello] Vue beforeCreate')
		},
		created() {
			// console.log('Page [hello] Vue created')
			// var appInstance = getApp()
			// console.log(appInstance.globalData) // I am global data
			this.$api.recommend().then(res => {
			  console.log(res)
				this.bookList = res.data.books
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
		// onShow: function() {
		// 	// Do something when page show.
		// 	wx.login({
		// 		success(res) {
		// 			console.log(res)
		// 		}
		// 	})
		// 	console.log('Page [hello] onShow')
		// },
		destroyed: function() {
			// Do something when page hide.
			this.$utils.bev.uploadBev()
		},
    onShareAppMessage (id) {
    setTimeout(() =>   this.$utils.bev.addbev(this.chooseBook._id, 4, 1), 0)
      return {
        title: this.chooseBook.title,
        path: '/pages/bookDetail/index?bookId=' + id,
        success(res) {
          console.log('成功', res)
        },
        fail(res) {
          console.log('失败', res)
        }
      }
    },
		methods:{
			// changeStat: function(){
			// 	this.t++
			// 	this.color = '#'+Math.floor(Math.random()*0xffffff).toString(16)
			// },
      choose(book) {
			  this.chooseBook = book
	      console.log(this.chooseBook)
      },
      toRead (book) {
        this.$router.push({path: '/pages/readPage/index',
          query: {
            chapterId: book._id + '0',
            title: book.title,
            bookId: book._id,
            mainImg: encodeURIComponent(book.mainImg.url),
            author: book.author,
            isSub: book.isSub
          }
        })
      },
      subscription (book, i) {
        if(book.isSub) return
        this.$api.subscription({
          bookId: book._id
        }).then(res => {
          if(res.status === 200) {
            book.isSub= true
            this.$set(this.bookList, i, book)
	          this.$toast.success('加入书架成功')
          } else {
            this.$toast.fail(res.message)
          }
        })
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
		.operation {
			justify-items: center;
			align-items: center;
			margin-top: 35px;
			padding-left: 6px;
			i {
				margin-right: 38px;
				color: #333;
			}
			button.read {
				width: 154px;
				height: 36px;
				padding: 0 13px;
				font-size: 16px;
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

	.share {
		outline: none;
		background: none;
		border: none;
		box-shadow: none;
		height: 34px;
		line-height: 34px;
		text-align: center;
		i {
			font-size: 23px;
			margin-bottom: 4px;
		}
		&:after{
			border: none;
		}
	}
</style>
