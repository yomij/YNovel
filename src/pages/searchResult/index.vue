<template>
	<div class="search-result">
		<div class="search-box van-hairline--bottom f-s-b">
			<v-s class="search-input f-g-1" :value="searchText" @blur="onBlur" @focus="onFocus" @search="onSearch" @cancel="onCancel" placeholder="请输入搜索关键词" />
			<span class="c-b" @click="onCancel">取消</span>
		</div>
		<div class="container">
			<div class="f-align-l base van-hairline--bottom">
				<img src="http://pic1.win4000.com/mobile/2018-12-10/5c0e13e2e923a.jpg"/>
				<div class="f-g-1">
					<p class="title">圣墟</p>
					<p class="extra">辰东<span class="dot"></span>玄幻<span class="dot"></span>连载<span class="dot"></span>104万字</p>
					<p class="desc">覅就算是激发就安分守己俺爸爸加丹加骄傲覅就算是激发就安分守己俺爸爸加丹加骄傲覅就算是激发就安分守己俺爸爸加丹加骄傲覅就算是激发就安分守己俺爸爸加丹</p>
				</div>
			</div>
		</div>
		<p class="no-more">( ´◔ ‸◔`) &nbsp; 没有更多啦</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				resultShow: true,
				searchHistory: [],
				searchText: ''
			}
		},
		created () {
			this.searchText = this.$route.query.search
			console.log(this.$route.query)
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
				console.log('aaa')
				this.$emit('transShow', false)
			},
			onBlur() {
				this.resultShow = false
			},
			onFocus() {
				this.resultShow = true
			},
			onSearch(e) {
				console.log(e)
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
		padding: 0 16px 0 6px
	}
	.container {
		padding: 0 16px;
		margin-bottom: 15px
	}
	.base {
		padding: 15px 0;
		.title {
			font-size: 16px;
			color: #f56366;
			margin-bottom: 3px;
			line-height: 100%;
		}
		.extra {
			font-size: 14px;
			color: #999;
			line-height: 100%;
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
