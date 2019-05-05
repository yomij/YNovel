<template>
	<div class="search-result">
		<div class="search-box van-hairline--bottom f-s-b">
			<v-s class="search-input f-g-1" :value="searchText" @blur="onBlur" @focus="onFocus" @search="onSearch" @cancel="onCancel" placeholder="请输入搜索关键词" />
			<span class="c-b" @click="onCancel">取消</span>
		</div>
		<div class="container">
			<div class="f-align-l base van-hairline--bottom" :key="index" @click="toDetail(item)" v-if="searchResult.length" v-for="(item, index) in searchResult">
				<img :src="item.mainImg.url"/>
				<div class="f-g-1">
					<p class="title" ><span v-html="item.title"></span></p>
					<p class="extra"><span v-html="item.author"></span><span class="dot"></span>{{item.mainTag}}<span class="dot"></span>{{item.status ? '连载' : '完结'}}<span class="dot"></span>{{(item.totalCount/ 10000).toFixed(0)}}万字</p>
					<p class="desc">{{item.description}}</p>
				</div>
			</div>
		</div>
		<p class="no-more">( ´◔ ‸◔`) &nbsp; {{searchResult.length ? '没有更多啦' : '没有找到相关内容'}}</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				resultShow: true,
				searchHistory: [],
				searchText: '',
				searchResult: []
			}
		},
		created () {
			this.searchText = this.$route.query.search
			this.search(this.searchText)
		},
		methods: {
			showResult() {
				this.resultShow = true
				console.log(this.resultShow)
			},
			hideResult() {
				this.resultShow = false
			},
			handleSearch(e) {
				console.log(e)
				// 搜索
				const _this = this
				Megalo.setStorage({
					key: 'searchHistory',
					data: _this.searchHistory.push('aaa')
				})
			},
			onCancel() {
				this.$router.reLaunch({path: '/pages/bookStore'})
			},
			onBlur() {
				this.resultShow = false
			},
			onFocus() {
				this.resultShow = true
			},
			onSearch(e) {
				console.log(e.detail)
				this.search(e.detail)
			},
			search(text) {
			  this.$api.search({search: text}).then(res => {
			    if (res.status === 200) {
			      let {result} = res.data
				    result = result.map(item => {
				      item.author = item.author.replace(this.searchText, `<span style='color:#f56366'>${this.searchText}</span>`)
              item.title = item.title.replace(this.searchText, `<span style='color:#f56366'>${this.searchText}</span>`)
				      return item
				    })
				    console.log(result)
				    this.searchResult = result
			    } else {
			      this.$toast.fail('搜索失败')
			    }
			  })
			},
      toDetail (item) {
			  const id = item._id
	      this.$router.push('/pages/bookDetail/index?bookId=' + id)
      }
		},
		watch: {
			resultShow(val) {
				if (val) {
					this.searchHistory = Megalo.getStorageSync('searchHistory') || []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		font-size: 15px;
		padding: 0 16px 0 6px;
	}
	.container {
		padding: 0 16px;
		margin-bottom: 15px
	}
	.base {
		padding: 15px 0;
		.title {
			font-size: 16px;
			color: #222;
			margin-bottom: 3px;
			line-height: 100%;
		}
		.extra {
			font-size: 14px;
			color: #999;
			line-height: 130%;
			margin: 8px 0;
		}
		.desc {
			font-size: 15px;
			color: #666;
			line-height: 20px;
			max-height: 40px;
			overflow:hidden;
			text-overflow:ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.reason {
			font-size: 14px;
			color: #cfc4ab;
			margin-top: 18px;
			text-align: center;
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
			display: block;
			border: 1px solid rgba(57, 74, 113, 0.1);
			min-width: 66px;
			width: 66px;
			height: 88px;
			margin-right: 11px ;
		}
	}


</style>
