<template>
	<div class="bookrack">
		<van-toast id="van-toast"/>
		<van-popup
				class="sure-box"
				:show="showBox"
				closeOnClickOverlay
				@close="showBox = false"
		>
			<div @click="sureDelete" class="sure">确认删除</div>
		</van-popup>
		<van-popup
				v-if="userInfo && !userInfo.phone"
				:show="showVer"
				position="right"
				closeOnClickOverlay
				@close="showVer = false"
				class="verity"
		>
			<nav class="nav f-align-l" :style="{'padding-top': statusBarHeight * 2  + 'rpx'}">
				<i @click="showVer = false" class="iconfont z-i-20 icon-weixin"></i>
				<p class="f-g-1">绑定手机号</p>
			</nav>
			<div>
				<Timer @back="showVer = false" @verifyPass="verifyPass"/>
			</div>
		</van-popup>
		<van-popup
			v-if="userInfo"
			:show="gradeShow"
			position="bottom"
			closeOnClickOverlay
			@close="gradeShow = false"
			class="grade"
	>
			<nav class="f-align-l" >
				<i @click="gradeShow = false" class="iconfont z-i-20 icon-close"></i>
				<p class="f-g-1 t-a-c">给打个分哦</p>
				<p class="c-b fs-17" @click="submitGrade">完成</p>
			</nav>
			<div class="f-align f-s-b main">
				<div class="book">
					<img :src="gradeItem.bookImage"/>
					<p>{{gradeItem.booktitle}}</p>
				</div>
				<div>
					<van-rate :value="gradeItem.grade" @change="change" color="#ed434c"/>
					<p class="mt-20">{{['非常不好看', '不好看', '还行', '好看', '非常好看'][gradeItem.grade - 1]}}</p>
				</div>
			</div>
	</van-popup>
		<nav class="nav f-align" :style="{'padding-top': statusBarHeight * 2  + 'rpx'}">
			{{userInfo && userInfo.nickname ? userInfo.nickname + '的书架' : '读书'}}
		</nav>
		<div class="user f-align-l">
			<div class="f-g-1 f-align-l"  @click="login">
				<img :src="userInfo ? userInfo.avatarUrl : avatarDefault"/>{{userInfo ? userInfo.nickname :'请登录'}}
			</div>
			<div class="bind f-align">
				<!--<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>-->
				<button @click="showVer = true" v-if="userInfo && !userInfo.phone">绑定手机号</button>
				<button @click="exit" v-if="userInfo">退出登陆</button>
			</div>
		</div>
		<div class="subscription">
			<div class="item f-align" @click="toRead(item)" v-for="(item, index) in bookList" :class="{'show-op':item.showOperation}" :key="index">
				<div class="content f-align f-s-b">
					<div class="f-align">
						<div class="relative">
							<img class="book-img" :src="item.book.mainImg.url">
							<div class="overhead" v-if="item.isMain">
								<i class="iconfont icon-dingzhi"></i>
							</div>
						</div>
						<div>
							<p class="title">{{item.book.title}}</p>
							<p class="small-p">{{item.lastRead ? item.lastRead.title : '还没读过哦'}}</p>
							<p>{{item.book.status === 0 ? '完本' : $utils.dateAgo(new Date(item.book.latestUpdate).getTime())}}</p>
						</div>
					</div>
					<divc class="f-align">
						<i class="icon iconfont icon-daipingjia01 pinjia" v-if="item.behavior && item.behavior.grade < 0" @click.stop="pinjia(item, index)"></i>
						<img class="more" :src="iconMore" @click.stop="showOperation(index)"/>

					</divc>
				</div>
				<div class="extra flex">
					<div class="operation" :class="{gray: item.isMain}" @click.stop="overhead(item, index)">{{item.isMain ? '取消顶置' : '顶置'}}</div>
					<div class="operation" @click.stop="unSub(item.book._id, index)">删除</div>
				</div>
			</div>
			<p v-if="bookList.length" class="no-more">您已读完全部内容</p>
			<div v-else class="no-data">
				<p class="f-18 c-6">暂无作品</p>
				<p @click="$router.replace({path: 'pages/recommend'})" class="f-13 c-lb">去推荐看看</p>
			</div>
		</div>
	</div>
</template>

<config>
	{
		navigationStyle: 'custom',
		usingComponents: {
			'van-rate': '/vant/rate/index',
		}
	}
</config>

<script>
	import HelloWorld from '@/components/HelloWorld.vue'
	import avatar from '@/assets/imgs/avatar_default.png'
	import Timer from '@/components/timer.vue'
  import iconMore from '@/assets/icons/icon_more.png'
	export default {
		components: {
			HelloWorld,
			Timer
		},
		data() {
			return {
				avatarDefault: avatar,
				iconMore,
				bookList: [],
				userInfo: null,
				statusBarHeight: 20,
				showBox: false,
				unSubFunction: null,
				showVer: false,
        gradeShow: false,
				gradeItem: {
				  index: 0,
				  grade: 5,
					bookImage: '',
					booktitle: '',
				}
			}
		},
		created() {
      Megalo.getSystemInfo().then(res => {
        this.statusBarHeight = res.statusBarHeight
      })
			var appInstance = getApp()
			console.log(appInstance.globalData) // I am global data
		},
		onShow: function() {
			// Do something when page show.
			if (!Megalo.getStorageSync('authorization')) return
			this.$api.getUserInfo().then(res => {
				if (res.status === 200) {
					this.userInfo = res.data
					const bookList = res.data.subscription.reverse()
          this.bookList = this.reList(bookList, false)
          getApp().globalData.bookList =  this.bookList
					console.log(getApp().globalData)
				}
			})
		},
		onHide() {
			this.$utils.bev.uploadBev()
		},
		methods:{
			login () {
			  if(!this.userInfo)
					this.$router.push({query: {id: 1}, path: '/pages/bookrack/login'})
				else {
				  console.log('去个人信息')
			  }
			},
      pinjia(item, index) {
			  this.gradeShow = true
	      this.gradeItem = {
          index,
			    bookId: item.book._id,
          bookImage: item.book.mainImg.url,
          booktitle: item.book.title,
          grade: item.book.grade || 5
	      }
      },
			change(e) {
				this.$set(this.gradeItem , 'grade', e.detail)
			},
      submitGrade () {
			  this.$api.grade({
					bookId: this.gradeItem.bookId,
				  grade: this.gradeItem.grade
			  }).then(res => {
			    if(res.status === 200) {
			      this.$toast.success('评价成功')
				    this.$set(this.bookList[this.gradeItem.index]['behavior'], 'grade',  )
				    this.gradeShow = false
			    }
			  })
      },
      exit() {
			  const _this = this
        Megalo.removeStorage({
          key: 'authorization',
	        success() {
            _this.$router.reLaunch('/pages/bookStore')
	        }
        })
      },
			showOperation (i) {
        this.bookList[i].showOperation = !this.bookList[i].showOperation
        this.bookList.splice()
			},
      unSub (bookId, index){
			  this.showBox = true
			  this.unSubFunction = () => {
          this.$api.unsubscription({
            bookId
          }).then(res => {
            if(res.status === 200) {
              this.showBox = false
              this.bookList.splice(index, 1)
            } else {
              this.showBox = false
              this.$toast.error(res.message)
            }
          })
			  }
      },
			sureDelete() {
			  if (typeof this.unSubFunction === 'function') {
          this.unSubFunction()
          this.unSubFunction = null
			  }
			},
			getData () {
			},
      toRead(item) {
        console.error(item.lastRead)
			  if(!item.lastRead) {
			    console.error(item.book._id)
			    return this.$router.push({path: '/pages/bookDetail/index', query: {bookId: item.book._id}})
			  }
        this.$router.push({path: '/pages/readPage/index',
          query: {
            chapterId: item.lastRead.id,
            title: item.book.title,
            bookId: item.book._id,
            mainImg: encodeURIComponent(item.book.mainImg.url),
            author: item.book.author,
            isSub: true
          }
        })
      },
			reList (list, isSort) {
			  if (isSort) list.sort((pre, next) => new Date(next.time).getTime() - new Date(pre.time).getTime())
			  let top = [], normal = []
        list.forEach(item => {
          item.showOperation = false
          item.time = new Date(item.time).getTime()
          item.isMain ? top.push(item) : normal.push(item)
        })
        return [...top, ...normal]
			},
      overhead(item, index) {
			  if (!item.isMain) {
          this.$toast.loading('顶置中')
          this.$api.overhead({
            bookId: item.book._id,
          }).then(res => {
            if (res.status === 200) {
              this.$toast.clear('')
              this.bookList[index].isMain = true
              this.bookList[index].showOperation = false
              this.bookList = this.reList(this.bookList, true)
	            this.bookList.splice()
            } else {
              this.$toast.error(res.message)
            }
          })
			  } else {
          this.$toast.loading('取消中')
          this.$api.unOverhead({
            bookId: item.book._id,
          }).then(res => {
            if (res.status === 200) {
              this.$toast.clear('取消中')
              this.bookList[index].isMain = false
              this.bookList[index].showOperation = false
              this.bookList = this.reList(this.bookList, true)
            } else {
              this.$toast.error(res.message)
            }
          })
			  }
      },
      verifyPass(phone) {
			  this.showVer = false
			  this.$set(this.userInfo, 'phone', phone)
      }
		},
		watch: {
		  showBox(val) {
		    val ? Megalo.hideTabBar() : Megalo.showTabBar()
		  }
		}
	}
</script>

<style lang="scss" scoped>
	.bookrack{
		padding-top: 85px;
		overflow-x: hidden;
		.nav {
			color: #666;
			font-size: 15px;
			height: 70px;
			background-color: #fff;
			position: fixed;
			top: 0;
			z-index: 80;
			width: 100%;
			/*padding-left: 20px;*/
			p {
				position: absolute;
				width: 100%;
				left: -20px;
				font-size: 16px;
				text-align: center;
			}
		}
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
			.small-p {
				margin: 5px 0;
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
			.overhead {
				position: absolute;
				color: #fff;
				top: 0;
				width: 25px;
				height: 25px;
				border-radius:  0  0 90px 0 ;
				background-color: rgba(0,0,0,.3);
				i {
					font-weight: bold;
					font-size: 18px;
				}
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
					&.gray {
						background:linear-gradient(45deg, #5e6a83 0%, #515c73 100%);
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
		.pinjia {
			font-weight: bold;
			font-size: 20px;
			margin-right: 6px;
		}

	}
	.sure-box {
		font-size: 17px;
		.sure {
			height: 50px !important;
			line-height: 50px;
			padding-left: 18px;
		}
	}
	.sure-box /deep/ {
		.van-popup, ._van-popup {
			height: 50px !important;
			width: 80%;
			border-radius: 8px;
			color: #ed434c !important;
		}
		.van-overlay {
			position: absolute;
			height: 100%;
			width: 100%;

		}
	}
	.verity /deep/{
		.van-popup, ._van-popup {
			padding: 100px 20px 0;
		}
	}
	.grade /deep/ {
		nav {
			padding: 10px 14px;
		}
		color: #666;
		font-size: 15px;
		.van-popup, ._van-popup {
			height: 200px !important;
			border-radius: 8px 8px 0 0;
		}
		.van-overlay {
			position: absolute;
			height: 100%;
			width: 100%;

		}
		.fs-17 {
			font-size: 17px;
		}
		.mt-20 {
			margin-top: 20px;
		}
		.main {
			padding: 0 30px;
		}
		.book {
			max-width: 100px;
			margin-right: 20px;
		}
		img {
			height: 95px;
			width: 70px;
			box-shadow: 0 0 1.5px #e6e5e3;
			margin-bottom: 10px;
		}
		.van-icon {
			font-size: 30px !important;
		}
	}

</style>
