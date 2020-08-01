import Login from './index.vue'
import Vue from 'vue'

const app = new Vue(Login)

app.$mount()

export default {
  config: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'Megalo',
    navigationBarTitleColor: '#ff00ff',
    usingComponents: {
      'van-slider': '/vant/slider/index',
      'van-popup': '/vant/popup/index'
    }
  }
}
