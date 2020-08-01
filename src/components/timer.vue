<template>
	<div class="timerBtn">
		<div class="f-a-s y-input van-hairline--bottom">
			<i class="iconfont z-i icon-weixin"></i>
			<input placeholder="请输入手机号" type="tel" v-model="phoneNumber"/>
		</div>
		<div class="f-a-s y-input van-hairline--bottom">
			<div class="f-a-s f-g-1">
				<i class="iconfont icon-weixin"></i>
				<input placeholder="输入六位数以上密码" type="password" v-model="password" class=""/>
			</div>
			<div>
				<button @click.prevent="getVerifiedCode"
				        :class="{right_phone_number: rightPhoneNumber && rightPassword,
                   wrong_phone_format: wrongPhoneFormat || wrongPasswordFormat}"
				        v-show='!computedTime'>获取验证码
				</button>
				<button class="compute_time" v-show="computedTime">{{computedMessage}}</button>
			</div>
		</div>
		<div class="f-a-s y-input van-hairline--bottom">
			<i class="iconfont icon-weixin"></i>
			<input placeholder="请输入验证码" type="number" v-model="code" class=""/>
		</div>
		<button class="login" @click="submit">绑定</button>
	</div>
</template>

<script>
  // import {mobileCode, checkExsis} from '../service/getData'
  export default {
    name: 'timeCountDowner',
    data() {
      return {
        computedTime: 0,
        wrongPhoneFormat: false,
        wrongPasswordFormat: false,
        phoneNumber: '',
        code: '',
        password: '',
        isSend: false
      }
    },
    props: {
      textValue: {
        type: String,
        default: '重新发送${second}'
      },
      second: {
        type: Number,
        default: 600
      }
    },
    computed: {
      rightPhoneNumber: function () {
        let regx = /^1\d{10}$/gi.test(this.phoneNumber);
        if (this.phoneNumber && !regx) {
          this.wrongPhoneFormat = true;
        } else {
          this.wrongPhoneFormat = false;
        }
        return regx;
      },
      rightPassword() {
        const res = this.password.length >= 6
        if (!res) {
          this.wrongPasswordFormat = true;
        } else {
          this.wrongPasswordFormat = false;
        }
        return res
      },
      computedMessage: function () {
        return this.textValue.replace(/\$\{second\}/g, this.computedTime);
      }
    },
    methods: {
      getVerifiedCode() {
        if (!this.password || this.password.length < 6) return this.$toast.fail('请输入六位密码')
        if (this.rightPhoneNumber) {
          this.$api.verifycode({
            phone: this.phoneNumber
          }).then(res => {
            if (res.status === 200) {
              this.$toast.success('验证码已发送')
              this.isSend = true
              this.setTimer();
            }
          })
        } else {
          this.$toast.fail('请输入正确的手机号')
        }
      },
      setTimer() {
        this.computedTime = this.second;
        this.timer = () => {
          if (this.computedTime > 0) {
            this.computedTime--;
            setTimeout(this.timer, 1000);
          } else {
            this.isSend = false
          }
        }
        this.timer();
      },
      submit() {
        if (!this.isSend) return this.$toast.fail('请先获取验证码')
        if (!/^1\d{10}$/gi.test(this.phoneNumber)) return this.$toast.fail('请输入正确的手机号')
        if (!this.password || this.password.length < 6) return this.$toast.fail('请输入六位密码')
        if (/^\d{6}$/gi.test(this.code)) {
          this.$toast.loading('绑定中')
          this.$api.verify({
            phone: this.phoneNumber,
            code: this.code,
            password: this.password
          }).then(res => {
            if (res.status === 200) {
              this.$toast.success('绑定成功')
              this.$emit('verifyPass', this.phoneNumber)
            } else {
              this.$toast.fail('failed：' + res.message)
            }
          })
        } else {
          this.$toast.fail('请输入6位验证码')
        }
      }
    },
    destroyed() {
      // 组件被销毁时调用
    }
  }
</script>

<style lang="scss" scoped>
	button {
		font-family: Helvetica Neue, Tahoma, Arial;
		padding: 0 13px;
		font-size: 11px;
		height: 27px;
		line-height: 27px;
		color: #fff;
		
		&.login {
			width: 78.4%;
			height: 40px;
			line-height: 40px;
			border-radius: 1000px;
			color: #fff;
			background: linear-gradient(45deg, #ec383c 0%, #fd563d 100%);
			opacity: .8;
			font-size: 18px;
			margin-top: 34px;
			position: relative;
			transform: translateX(-50%);
			left: 50%;
		}
	}
	
	.y-input {
		width: 100%;
		margin: 0 auto;
		padding: 16px 6px;
		font-size: 15px;
		
		input {
			margin: 0 15px;
			flex-grow: 1;
			color: #666;
		}
	}
	
	button {
		background-color: #919191;
	}
	
	.right_phone_number {
		background-color: #ec383c;
	}
	
	.wrong_phone_format {
		background-color: #F7C0B3;
	}

</style>
