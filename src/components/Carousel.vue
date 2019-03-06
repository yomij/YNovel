<template>
	<div class="top-list f-align-l" >
		<div class="bg" :style="{
			'background-image': 'url('+ list[activeIndex].mainImg +')'
		}"></div>
		<!--<div class="bg"></div>-->
		<ul class="book-list">
			<li v-for="(book, index) in list" :key="index" class="book" :class="{active: index === activeIndex}">
				{{book.title}} <span>{{book.author}}</span>
			</li>
		</ul>
		<div class="img-container">
			<img v-for="(book, index) in list" :key="index" :src="book.mainImg"
					 :style="{
						'z-index': 100 - (activeIndex - transList[activeIndex][index]),
							transition: `all ${activeIndex === index ? '.5' : '.25'}s`,
						 height: 95 - 6.25 * (activeIndex - transList[activeIndex][index]) + 'px',
						 left: 3.125 * (activeIndex - transList[activeIndex][index]) * 4 + 'px',
						 width: 70 - 6.25 * (activeIndex - transList[activeIndex][index]) + 'px',
					 }"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		props: {
			'list': Array,

		},
		created () {
			console.log('aaa')
			setInterval(() => {
				this.activeIndex = (this.activeIndex + 1) % 3
			}, 2000)
		},
		data() {
			return {
				transList: [[0, -1, -2], [-1, 1, 0], [1, 0, 2]],
				activeIndex: 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-list {
		position: relative;
		color: #fff;
		height: 120px;
		background-color: rgba(0, 0, 0, .7);
		border-radius: 5px;
		padding: 14px;
		.book-list {
			width: 200px;
		}
		.bg {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			z-index: -1;
			background-size: cover;
			background-position: 50% 50%;
			/*filter: blur(15px);*/
		}
		.book {
			font-size: 14px;
			margin-bottom: 15px;
		&:last-child {
			 margin-bottom: 0;
		 }
		&.active {
			 position: relative;
		&:after {
			 position: absolute;
			 left: -10px;
			 content: '';
			 display: inline-block;
			 width: 0;
			 height: 0;
			 top: 50%;
			 transform: translateY(-50%);
			 border-left: 10px solid #fff;
			 border-top: 5px solid transparent;
			 border-bottom: 5px solid transparent;
		 }
		}
		}
		.img-container {
			position: relative;
			height: 95px;
		}
		img {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			/*position: absolute;*/
		}
	}
</style>
