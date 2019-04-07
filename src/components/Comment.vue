<template>
	<div class="commit f-a-s">
			<img :style="{width: imgSize +'rpx', height: imgSize +'rpx', 'min-width': imgSize +'rpx'}" class="van-hairline--surround" :src="'http://pic1.win4000.com/mobile/2018-12-10/5c0e13e2e923a.jpg'"/>
			<div class="c-content van-hairline--bottom f-g-1">
				<h4>MaxWell</h4>
				<p class="c-text">我不是猪猪，我不是猪猪，我不是猪猪我不是猪猪，我不是猪猪，我不是猪猪，我不是猪猪</p>
				<div class="f-s-b more-info">
					<span>2019-1-11</span>
					<div class="f-align"><i class="iconfont icon-weixin"></i> 133</div>
				</div>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'commit',
		props: {
			'book': Object,
			'imgSize': {
			  default: 50
			}
		},
		data() {
			return { }
		}
	}
</script>

<style lang="scss" scoped>
	.commit {
		padding: 18px 16px 0;
		font-size: 16px;
		color: #4e5255;
		img {
			min-width: 25px;

			border-radius: 50%;
		}
		h4 {
			line-height: 25px;
			font-weight: normal;
		}
		.c-content {
			padding: 0 9px 16px;
		}
		.c-text {
			line-height: 23.5px;
		}
		.more-info {
			font-size: 12px;
			margin-top: 5px;
			color: #999;
			i {
				margin-right: 5px;
			}
		}
	}
</style>
