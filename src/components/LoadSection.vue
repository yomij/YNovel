<template>
	<scroll-view scroll-y class="section-list" @scroll="sectionScroll">
		<h2 class="title van-hairline--bottom">正文卷</h2>
		<div class="section van-hairline--bottom" v-for="(item, index) in sectionList" :key="index">
			<p>{{item.title}}</p>
			<p>{{item.time}}</p>
		</div>
	</scroll-view>
</template>

<script>
	export default {
		name: 'HelloWorld',
		props: {
			sectionList: {
				default: []
			}
		},
		data() {
			return {
				totalHeight: 0,
				isLoading: false,
				screenHeight: 0
			}
		},
		created () {
			this.isLoading = false
			this.totalHeight = 36 + 72 * (this.sectionList.length - 1)
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
				console.log(top, this.totalHeight, top > this.totalHeight - this.screenHeight)
				if (top > this.totalHeight - this.screenHeight) {
					this.isLoading = true
					console.log('emit', top > this.totalHeight - this.screenHeight)
					this.$emit('loading')
				}
			}
		},
		watch: {
			sectionList(v) {
				console.log('change')
				this.isLoading = false
				this.totalHeight = 36 + 72 * (v.length - 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.section-list {
		padding-left: 16px;
		height: 100%;
		font-size: 17px;
		color: #000;
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
