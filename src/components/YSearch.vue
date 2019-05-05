<template>
	<div class="y-search">
		<van-popup :show="show" @close="$emit('transShow', false)" position="right">
			<div class="search-box van-hairline--bottom f-s-b">
				<van-search v-if="show" class="search-input f-g-1" @change="onChange" @blur="onBlur" @focus="onFocus" @search="onSearch" @cancel="onCancel" placeholder="请输入搜索关键词" />
				<span class="c-b" @click="onCancel">取消</span>
			</div>
			<div class="search-result" v-if="!resultShow">
				<div class="history" v-if="searchHistory.length">
					<h3 class="f-s-b">搜索历史<i class="iconfont icon-lajitong" @click="clearHistory"></i></h3>
					<div class="box van-hairline--surround" @click="hSearch(item)" v-for="(item, index) in searchHistory" :key="index">{{item}}</div>
				</div>
				<div class="hot-search">
					<h3>热门搜索</h3>
					<div @click="hSearch('完美世界')" class="box van-hairline--surround">完美世界</div>
					<div @click="hSearch('遮天')" class="box van-hairline--surround">遮天</div>
				</div>
			</div>
			<div v-if="resultShow">
				<div class="author" v-if="preSearch && preSearch.author">{{preSearch.author}}</div>
				<ul class="search-helper van-hairline--top-bottom" v-if="preSearch && preSearch.authorBooks">
					<li @click="bookDetail(item)" v-for="(item, index) in preSearch.authorBooks" :key="item._id" class="van-hairline--bottom f-align-l"><i class="iconfont icon-tuijian"></i>{{item.title}}</li>
				</ul>
				<div class="line" v-if="preSearch && preSearch.author && preSearch.searchBooks.length"></div>
				<ul class="search-helper van-hairline--top-bottom" v-if="preSearch && preSearch.searchBooks">
					<li  @click="bookDetail(item)" v-for="(item, index) in preSearch.searchBooks" :key="item._id" class="van-hairline--bottom f-align-l"><i class="iconfont icon-tuijian"></i>{{item.title}}</li>
				</ul>
			</div>
		</van-popup>
	</div>
</template>


<script>
	export default {
		name: 'YSearch',
		props: {
			show: false
		},
		model: {
			prop: 'show',
			event: 'transShow'
		},
		data () {
			return {
				resultShow: false,
				searchHistory: [],
				isLoading: false,
				timeout: null,
				preSearch: null,
				text: ''
			}
		},
		methods: {
		  bookDetail (item) {
		    console.log(item, item._id)
			  this.$router.push({path: '/pages/bookDetail/index', query: {bookId: item._id}})
		  },
			showResult () {
				this.resultShow = true
				console.log(this.resultShow)
			},
			hideResult () {
				this.resultShow = false
			},
			onCancel () {
				this.$emit('transShow', false)
			},
			onBlur () {
			  if (!this.text) {
          this.resultShow = false
				  this.preSearch = null
			  }
			},
			onFocus () {
				this.resultShow = true
			},
			onSearch (e) {
				// 搜索
        this.searchHistory.unshift(e.detail)
				const data = this.searchHistory.splice(0, 10)
				Megalo.setStorage({
					key: 'searchHistory',
					data: data
				})
				this.$router.replace({path: 'pages/searchResult/index', query: {search: e.detail}})
			},
      onChange (e) {
			  this.text = e.detail
			 if (this.isLoading) return
	      if (this.timeout) clearTimeout(this.timeout)
	      this.timeout = setTimeout(() => {
	        this.isLoading = true
	        this.$api.preSearch({
		        search: e.detail
	        }).then(res => {
            this.isLoading = false
	          console.log(res)
		        if (res.status === 200) {
		          this.preSearch = res.data
		        }
	        })
	      }, 500)
      },
      hSearch(text) {
        this.$router.replace({path: 'pages/searchResult/index', query: {search: text}})
      },
      clearHistory() {
			  this.searchHistory = []
        Megalo.setStorage({
          key: 'searchHistory',
          data: []
        })
      }
		},
		watch: {
			resultShow (val) {
        if (val) {
          Megalo.getStorage({key: 'searchHistory'}).then(res => {
            this.searchHistory = res.data || []
          })
        }
      },
      show (val) {
        if (val) {
          Megalo.getStorage({key: 'searchHistory'}).then(res => {
            this.searchHistory = res.data || []
          })
        } else {
          this.resultShow = false
          this.isLoading = false
          this.timeout = null
          this.preSearch = null
          this.text = ''
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		font-size: 15px;
		padding: 0 16px 0 6px
	}
	.search-result {
		padding: 0 16px;
		h3 {
			font-size: 15px;
			line-height: 100%;
			margin: 18px 0;
		}
		.icon-lajitong {
			color: #333;
		}
		.box {
			border-radius: 3px;
			display: inline-block;
			text-align: center;
			padding: 13px;
			font-size: 14px;
			margin-right: 8px;
		}
	}
	.author {
		background-color: #f4f8fb;
		font-size: 13px;
		padding: 13px 16px;
		color: #c2c5cc;
	}
	.line {
		background-color: #f4f8fb;
		height: 10px;

	}
	.search-helper {
		font-size: 15px;
		padding: 0 16px;
		li {
			padding: 16px 0;
			&.last {
				&:after {
					display: none !important;
				}
			}
		}
		i {
			margin-right: 8px;
		}
	}
</style>
