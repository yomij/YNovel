<template>
	<div class="login">
		<header>
			<p class="f-18">Login</p>
			<p class="f-13">Welcome to Yomi</p>
		</header>
		<div class="main">
			<div class="title f-15 t-a-c">账号登录</div>
			<div>
				<div class="y-input f-align-l van-hairline--bottom">
					<i class="iconfont icon-yonghu icon-c"></i>
					<input v-model="phone" class="f-g-1" placeholder="请输入手机号" type="text"/>
				</div>
				<div class="y-input f-align-l van-hairline--bottom">
					<i class="iconfont icon-mima icon-c"></i>
					<input v-model="password" class="f-g-1" placeholder="请输入密码" :type="showPassword ? 'text' : 'password'"/>
					<i class="iconfont icon-kejian" @touchstart="showPassword = true" @touchend="showPassword = false"></i>
				</div>
				<p class="c-cyan f-11 agreement">同意
					<用户协议>
				</p>
				<button @click="login" class="login" :style="{opacity: phoneOk && passwordOk ? '1' : '.8'}">登陆</button>
			</div>
		</div>
		<van-toast id="van-toast"/>
		<div class="extra">
			<p class="t-a-c f-11 c-6">其他登陆方式</p>
			<div class="f-align">
				<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="f-align f-dir-column" @click="loginWx">
					<div class="wx radius f-align">
						<i class="iconfont icon-weixin"></i>
					</div>
					<p class="c-cyan f-11">微信登陆</p>
				</button>
			</div>
		</div>
	</div>
</template>

<config>
	{
	"navigationBarBackgroundColor": "#ffffff",
	"navigationBarTextStyle": "black",
	"navigationBarTitleText": "快捷登录",
	"backgroundColor": "#eeeeee",
	"backgroundTextStyle": "light",
	"usingComponents": {
	"van-field": "/vant/field/index",
	"van-toast": "/vant/toast/index"
	}
	}
</config>

<script>
  export default {
    data() {
      return {
        userInfo: null,
        password: '',
        phone: '',
        showPassword: false
      }
    },
    created() {
      // Megalo.getSetting().then(res => console.log(res))
    },
    computed: {
      phoneOk() {
        return /^1\d{10}$/g.test(this.phone)
      },
      passwordOk() {
        return this.password.length >= 6
      }
    },
    methods: {
      getUserInfo(e) {
        
        Megalo.getUserInfo().then(info => Megalo.login().then(res => {
          this.$api.loginWx({
            code: res.code,
            userInfo: info.userInfo
          }).then(res => {
            if (res.status === 200) {
              console.log(res.data.token)
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
      },
      login() {
        if (!this.phoneOk) {
          return this.$toast.fail('请输入正确手机号')
        }
        if (!this.passwordOk) {
          return this.$toast.fail('密码错误')
        }
        this.$api.login({
          phone: this.phone,
          password: this.password
        }).then(res => {
          if (res.status === 200) {
            console.log(res.data.token)
            Megalo.setStorage({
              key: 'authorization',
              data: res.data.token
            })
            this.$toast('登陆成功')
            Megalo.switchTab({
              url: '/pages/bookrack'
            })
          } else {
            this.$toast.fail(res.message)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
	.login {
		position: absolute;
		height: 100%;
		width: 100%;
		
		header {
			padding: 20px 4% 0;
			height: 78px;
			background: linear-gradient(45deg, #ec383c 0%, #fd563d 100%);
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
				color: #d2d1d9;
				margin: 0 15px;
			}
		}
		
		button.login {
			width: 78.4%;
			height: 50px;
			line-height: 50px;
			border-radius: 1000px;
			color: #fff;
			background: linear-gradient(45deg, #ec383c 0%, #fd563d 100%);
			opacity: .8;
			/*margin: 34px auto 0;*/
			margin-top: 34px;
			position: relative;
			transform: translateX(-50%);
			left: 50%;
			font-size: 16px;
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
			margin: 25px 0 17px;
			background: #ebfff4;
			
			i {
				font-size: 30px;
				color: #3ccc87;
			}
		}
		
		
		.icon-c {
			color: #d2d1d9;
		}
	}
</style>
