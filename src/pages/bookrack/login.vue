<template>
  <div class="login">
    <header>
      <p>Yomi登录</p>
      <p>Welcome to Yomi</p>
    </header>
    <div>
      <ul>
        <li>账号登录</li>
      </ul>
      <div>
        <div class="y-input f-align van-hairline--bottom">
          <i class="iconfont icon-yonghu"></i> <input placeholder="请输入邮箱/手机号/用户名" type="text"/>
        </div>
        <div class="y-input f-align van-hairline--bottom">
          <i class="iconfont icon-yonghu"></i>
          <input placeholder="请输入密码" type="text"/>
          <i class="iconfont icon-kejian" ></i>
        </div>
        <button>登陆</button>
      </div>
      <p>其他登陆方式</p>
      <div class="f-align">
        <div class="f-align f-dir-column" @click="loginWx">
          <div class="wx radius f-align">
            <i class="iconfont icon-weixin"></i>
          </div>
          <button open-type="getUserInfo" bindgetuserinfo="getUserInfo"> 获取头像昵称 </button>
          <p>微信登陆</p>
        </div>
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
      "van-field": "/dist/field/index"
    }
  }
</config>

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
  methods:{
    loginWx() {
      console.log('login')
      Megalo.login().then(res => {
        // Megalo.getUserInfo().then(res => console.log(res))
        this.$api.loginWx({
          code: res.code
        }).then(res => {
          console.log(res)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  header {
		height: 150px;
		background:linear-gradient(45deg, #ec383c 0%,#fd563d 100%);
	}
  .y-input {
    width: 92%;
    margin: 0 auto;
  }
  button {
    width: 92%;
    height: 50px;
    border-radius: 1000px;
    background-color: red;
    color: #fff;
  }
  .wx {
    border: 1px solid rgba(3, 51, 11, 0.77);
    background: rgba(3, 51, 11, 0.32);
    height: 50px;
    width: 50px;
    color: #00ff00;
    text-align: center;
    i {
      font-size: 30px;
    }
  }
}
</style>
