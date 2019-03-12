<template>
	<div class="commit f-a-s">
		<img class="van-hairline--surround" :src="'http://pic1.win4000.com/mobile/2018-12-10/5c0e13e2e923a.jpg'"/>
		<div class="content van-hairline--bottom">
			<h4>MaxWell</h4>
			<p class="text">我不是猪猪，我不是猪猪，我不是猪猪我不是猪猪，我不是猪猪，我不是猪猪，我不是猪猪</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'commit',
		props: {
			'book': Object,
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
			width: 25px;
			height: 25px;
			border-radius: 50%;
		}
		h4 {
			line-height: 25px;
			font-weight: normal;
		}
		.content {
			padding: 0 9px 16px;
		}
		.text {
			line-height: 23.5px;
		}
	}
</style>
