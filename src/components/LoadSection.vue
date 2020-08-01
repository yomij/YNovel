<template>
	<scroll-view :scroll-top="(showChapterNum - 5 > 0 ? showChapterNum - 5 : 0) * sectionHeight  "
	             :style="{color: color[0], background: color[1], height: height}" scroll-y class="section-list"
	             @scroll="sectionScroll">
		<h2 class="title" :class="{'van-hairline--bottom': !noBorder}">正文卷</h2>
		<div @click="toRead(item)" class="section-y section"
		     :class="{'van-hairline--bottom': !noBorder, red: showChapterNum === index}"
		     v-for="(item, index) in sectionList" :key="index">
			<p class="van-ellipsis" :class="{red: showChapterNum === index}">{{item.title}}</p>
			<p>{{$utils.formatDate('yyyy-MM-dd hh:mm:ss', new Date(item.createTime))}}</p>
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
      },
      showChapterNum: {
        default: 0
      },
      height: {
        default: 'calc(100% - 140rpx)'
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
    created() {
      Megalo.getSystemInfo().then(res => {
        this.screenHeight = res.screenHeight
      })
    },
    mounted() {
      this.getHeight()
    },
    computed: {
      // totalHeight () {
      //
      // }
    },
    methods: {
      sectionScroll(e) {
        if (this.isLoading || !this.screenHeight) return
        let top = e.detail.scrollTop
        if (top > this.totalHeight - this.screenHeight) {
          this.isLoading = true
          this.$emit('loading')
        }
      },
      toRead(chapter) {
        this.$emit('toRead', chapter)
      },
      getHeight() {
        if (this.totalHeight > 100) return
        setTimeout(() => {
          if (!this.sectionHeight) {
            const _this = this
            const query = Megalo.createSelectorQuery();
            query.select('.section-y').boundingClientRect()
            query && query.exec(function (res) {
              console.log(res)
              _this.sectionHeight = res[0] && res[0].height
              _this.totalHeight = 100 + _this.sectionHeight * (_this.sectionList.length - 1)
            })
          }
        }, 100)
      }
    },
    watch: {
      sectionList(v) {
        this.getHeight()
        this.isLoading = false
        this.totalHeight = 100 + this.sectionHeight * (v.length - 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
	.section-list {
		height: calc(100% - 70px);
		font-size: 17px;
		
		.title {
			height: 36px;
			line-height: 36px;
			padding-left: 16px;
		}
		
		.section {
			line-height: 28px;
			padding: 8px 8px 8px 16px !important;
			max-width: 260px;
		}
		
		.red {
			color: #ec383c;
		}
	}
</style>
