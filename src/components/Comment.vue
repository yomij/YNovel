<template>
	<div class="commit f-a-s" v-if="comment && comment.user">
			<img :style="{width: imgSize +'rpx', height: imgSize +'rpx', 'min-width': imgSize +'rpx'}" class="van-hairline--surround" :src="comment.user.avatarUrl"/>
			<div class="c-content van-hairline--bottom f-g-1">
				<h4>{{comment.user.nickname}}</h4>
				<p class="c-text">{{comment.content}}</p>
				<div class="f-s-b more-info">
					<span>{{$utils.formatDate('yyyy-MM-dd hh:mm', comment.createTime)}}</span>
					<div class="f-align" @click="like(comment.isLike)"><i class="iconfont icon-dianzan" :class="{'c-r': comment.isLike}"></i> {{comment.likeCount}}</div>
				</div>
				<div class="extra-u" v-if="showChapter">章节:{{comment.chapter.title}} 的评论</div>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'commit',
		props: {
			'comment': Object,
			'imgSize': {
			  default: 50
			},
			'showChapter': {
			  default: false
			}
		},
		data() {
			return {
			  isLoading: false
			}
		},
		methods: {
		  like(isLike) {
		    if(this.isLoading) return
		    this.isLoading = true
		    if(!isLike) {
          this.$set(this.comment, 'isLike', true)
          this.$set(this.comment, 'likeCount', this.comment.likeCount + 1)
          this.$api.likeComment({
            id: this.comment._id
          }).then(res => {
            if(res.status === 200) {

	            this.isLoading = false
            }
          })
		    } else {
          this.$set(this.comment, 'isLike', false)
          this.$set(this.comment, 'likeCount', this.comment.likeCount - 1)
          this.$api.unlikeComment({
            id: this.comment._id
          }).then(res => {
            if(res.status === 200) {
              this.isLoading = false
            }
          })
		    }
		  }
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
		.extra-u {
			font-size: 12px;
			margin-top: 5px;
			color: #999;
		}
	}
</style>
