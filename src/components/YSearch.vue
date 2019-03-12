<template>
	<div class="y-search">
		<van-popup :show="show" @close="$emit('transShow', false)" position="right">
			<div class="search-box van-hairline--bottom f-s-b">
				<van-search class="search-input f-g-1" @blur="onBlur" @focus="onFocus" @search="onSearch" @cancel="onCancel" placeholder="请输入搜索关键词" />
				<span class="c-b" @click="onCancel">取消</span>
			</div>
			<div class="search-result" v-if="!resultShow">
				<div class="history">
					<h3>搜索历史<i class="iconfont"></i></h3>
					<div class="box van-hairline--surround">历史A</div>
					<div class="box van-hairline--surround">历史B</div>
				</div>
				<div class="hot-search">
					<h3>热门搜索</h3>
					<div class="box van-hairline--surround">历史A</div>
					<div class="box van-hairline--surround">历史B</div>
				</div>
			</div>
			<ul class="search-helper" v-else>
				<li class="van-hairline--bottom f-align-l"><i class="iconfont icon-yonghu"></i>1</li>
				<li>1</li>
				<li>1</li>
				<li>1</li>
			</ul>
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
				resultShow: true,
				searchHistory: [],
			}
		},
		methods: {
			showResult () {
				this.resultShow = true
				console.log(this.resultShow)
			},
			hideResult () {
				this.resultShow = false
			},
			onCancel () {
				console.log('aaa')
				this.$emit('transShow', false)
			},
			onBlur () {
				this.resultShow = false
			},
			onFocus () {
				this.resultShow = true
			},
			onSearch (e) {
				console.log(e)
				// 搜索
				Megalo.setStorage({
					key: 'searchHistory',
					data: this.searchHistory.push('aaa')
				})
				this.$router.replace({path: 'pages/searchResult/index', query: {search: e.detail}})
			}
		},
		watch: {
			resultShow (val) {
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
	.search-result {
		padding: 0 16px;
		h3 {
			font-size: 15px;
			line-height: 100%;
			margin: 18px 0;
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
	.search-helper {
		font-size: 15px;
		padding: 10px 16px;
		li {
			padding: 10px 0;
		}
		i {
			margin-right: 8px;
		}
	}
</style>
