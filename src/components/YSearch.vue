<template>
	<div class="y-search">
		<div class="search-box van-hairline--bottom">
			<van-search class="" @focus="showResult" @blur="hideResult" class="search-input" @cancel="onCancel" placeholder="请输入搜索关键词" />
		</div>
		<div v-if="resultShow"  class="search-result">
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
	</div>
</template>



<script>
	export default {
		name: 'YSearch',
		props: { },
		data() {
			return {
				resultShow: false,
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
			handleSearch (e) {
				console.log(e)
				// 搜索
				Megalo.setStorage({
					key: 'searchHistory',
					data: this.searchHistory.push('aaa')
				})
			},
			onCancel () {

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
	.y-search {
		height: 100%;

	}
	.search-box /deep/ {
		.field-index--van-field {
			/*height: 38px;*/
			background: #fff;
			color: #666;
			font-size: 13px;
		}
		.van-search {
			height: 38px;
			background: #fff !important;
			color: #666;
			padding: 13px 16px;
		}
	}
	.box {
		border-radius: 3px;
		display: inline-block;
		text-align: center;
		padding: 13px;
		font-size: 12px;
		margin-right: 8px;
	}
</style>
