<template>
	<div class="top-list f-align-l" v-if="list.length">
		<div class="bg" :style="{
			'background-image': 'url('+ list[activeIndex].mainImg.url +')'
		}"></div>
		<ul class="carousel-list">
			<li @click="toDetail(index)" v-for="(book, index) in list.slice(0, 3)" :key="index" class="book"
			    :class="{active: index === activeIndex}">
				{{index + 1 + '.' + book.title}} <span>{{book.author}}</span>
			</li>
		</ul>
		<div class="img-container">
			<img @click="toDetail(index)"
			     v-for="(book, index) in list" :key="index" :src="book.mainImg.url"
			     :style="{
						'z-index': 20 - (activeIndex - transList[activeIndex][index]),
						transition: `all ${activeIndex === index ? '.8' : '.4'}s`,
						height: (95 - 6.25 * (activeIndex - transList[activeIndex][index])) * 2 + 'rpx',
						left: 3.125 * (activeIndex - transList[activeIndex][index]) * 8 + 'rpx',
						width: (70 - 6.25 * (activeIndex - transList[activeIndex][index])) * 2 + 'rpx',
					 }"/>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'carousel',
    props: {
      'list': Array,
    },
    created() {
      setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % 3
      }, 3000)
    },
    data() {
      return {
        transList: [[0, -1, -2], [-1, 1, 0], [1, 0, 2]],
        activeIndex: 0
      }
    },
    methods: {
      toDetail(index) {
        this.$router.push({path: '/pages/bookDetail/index', query: {bookId: this.list[index]._id}})
      }
    }
  }
</script>

<style lang="scss" scoped>
	.top-list {
		position: relative;
		color: #fff;
		height: 120px;
		background-color: rgba(5, 6, 18, 0.71);
		border-radius: 5px;
		padding: 15px 20px;
		overflow: hidden;
		
		.carousel-list {
			width: 230px;
			font-size: 15px;
			
			span {
				font-size: 13px;
			}
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
			filter: blur(20px);
			overflow: hidden;
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
					left: -8px;
					content: '';
					display: inline-block;
					width: 0;
					height: 0;
					top: 50%;
					transform: translateY(-50%);
					border-left: 6px solid #fff;
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
			box-shadow: 0 0 1px #e6e5e3;
			/*position: absolute;*/
		}
	}
</style>
