<template>
	<scroll-view :style="{color: color[0], background: color[1]}" scroll-y class="section-list" @scroll="sectionScroll">
		<h2 class="title" :class="{'van-hairline--bottom': !noBorder}">正文卷</h2>
		<div class="section-y section" :class="{'van-hairline--bottom': !noBorder}" v-for="(item, index) in sectionList" :key="index">
			<p>{{item.title}}</p>
			<p>{{item.time}}</p>
		</div>
	</scroll-view>
</template>

<script>
	export default {
		name: 'loading',
		props: {
			sectionList: {
				default: []
			},
			color: {
				default: []
			},
			noBorder: {
				default: false
			}
		},
		data() {
			return {
				totalHeight: 0,
				isLoading: false,
				screenHeight: 0,
				sectionHeight: 0
			}
		},
		onShow () {
			this.isLoading = false
			const _this = this
			const query = Megalo.createSelectorQuery();
			query.select('.section-y').boundingClientRect()
			query.exec(function (res) {
				console.log(res)
				_this.sectionHeight = res[0].height
			})
			this.totalHeight = 36 + this.sectionHeight * (this.sectionList.length - 1)
			Megalo.getSystemInfo().then(res => {
				this.screenHeight = res.screenHeight
			})
		},
		computed: {
			totalHeight () {

			}
		},
		methods: {
			sectionScroll (e) {
				if (this.isLoading || !this.screenHeight) return
				let top = e.detail.scrollTop
				if (top > this.totalHeight - this.screenHeight) {
					this.isLoading = true
					this.$emit('loading')
				}
			}
		},
		watch: {
			sectionList(v) {
				this.isLoading = false
				this.totalHeight = 36 + this.sectionHeight * (v.length - 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.section-list {
		padding-left: 16px;
		height: 100%;
		font-size: 17px;
		.title {
			height: 36px;
			line-height: 36px;
		}
		.section {
			line-height: 28px;
			padding: 8px;
		}
	}
</style>
