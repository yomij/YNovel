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
      <div></div>
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
      "van-field": "/vant/field/index"
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
      logo: 'https://user-images.githubusercontent.com/20720117/48262986-80e02780-e45f-11e8-8426-2872916adad9.png',
      color: '#007d37',
      acc: 'hello yomi'
    }
  },
  methods:{
    changeStat: function(){
      this.t++
      this.color = '#'+Math.floor(Math.random()*0xffffff).toString(16)
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  header {
		height: 300px;

		background:linear-gradient(45deg, #ec383c 0%,#fd563d 100%);
	}
}
</style>
