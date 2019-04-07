<template>
	<nav class="f-s-b">
		<i></i>
		<p>发布</p>
	</nav>
	<div class="comment-page">
		<textarea placeholder="这是一个可以自动聚焦的textarea" auto-focus />
	</div>
</template>


<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  components: {
      HelloWorld
  },
  data() {
    return {

    }
  },
	created () {
		// Megalo.getSetting().then(res => console.log(res))
	},
  methods:{
	  getUserInfo(e) {
		
		  Megalo.getUserInfo().then(info =>  Megalo.login().then(res => {
			  this.$api.loginWx({
				  code: res.code,
					userInfo: info.userInfo
			  }).then(res => {
				  console.log(res, info)
				  if (res.status === 200) {
            Megalo.setStorage({
              key: 'authorization',
              data: res.data.token
            })
					  this.$toast('登陆成功')
            Megalo.switchTab({
	            url: '/pages/bookrack'
            })
				  }

			  })
		  }))
	  }
  }
}
</script>

<style lang="scss" scoped>
.login{
	position: absolute;
	height: 100%;
	width: 100%;
  header {
		padding: 20px 4% 0;
		height: 78px;
		background:linear-gradient(45deg, #ec383c 0%,#fd563d 100%);
		color: #fff;
		p {
			margin-bottom: 5px;
		}
	}
	.main {
		transform: translateY(-6px);
		background: #fff;
		border-radius: 6px;
		padding-top: 26px;
	}
	.title {
		position: relative;
		margin-bottom: 30px;
		&::after {
			content: '';
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 120%;
			display: inline-block;
			height: 2px;
			width: 18px;
			background: #ec373c;
		}
	}
  .y-input {
    width: 92%;
    margin: 0 auto;
		padding: 16px 6px;
		font-size: 15px;
		input {
			margin: 0 15px;
		}
  }
  button.login {
    width: 78.4%;
    height: 50px;
    border-radius: 1000px;
    color: #fff;
		background:linear-gradient(45deg, #ec383c 0%,#fd563d 100%);
		opacity: .8;
		/*margin: 34px auto 0;*/
	  margin-top: 34px;
	  position: relative;
	  transform: translateX(-50%);
	  left: 50%;
  }
	.agreement {
		margin: 16px 0 0 4%;
	}
	.extra {
		position: absolute;
		width: 100%;
		bottom: 30px;
		button {
			background: none;
			&:after {
				border: none;
			}
		}
	}
  .wx {
    border: 1px solid #c7dad0;
    height: 50px;
    width: 50px;
    color: #00ff00;
    text-align: center;
		margin:25px 0 17px;
		background: #ebfff4;
    i {
      font-size: 30px;
			color: #3ccc87;
    }
  }
}
</style>
