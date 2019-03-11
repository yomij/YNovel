<template>
	<div class="book">
		<img :src="book.mainImg"/>
		<p class="title">{{book.title}}</p>
		<p class="author">{{book.author}}</p>
	</div>
</template>

<script>
	export default {
		name: 'book',
		props: {
			'book': Object,
		},
		data() {
			return { }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.book {
		width: 70px;
		font-size: 12px;
		height: 153px;
		img {
			height: 95px;
			width: 70px;
			box-shadow: 0 0 1.5px #e6e5e3;
			margin-bottom: 10px;
		}
		p {
			width: 100%;
			text-align: left;
			line-height: 13px;
		}
		.title {
			max-width: 70px;
			color: #888;
			margin-bottom: 6px;
		}
		.author {
			color: #bcbcbc;
			max-width: 70px;
		}
	}
</style>
