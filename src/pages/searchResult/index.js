import SR from './index.vue'
import Vue from 'vue'

const app = new Vue(SR)

app.$mount()

export default {
  config: {
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "搜索",
    "backgroundColor": "#eeeeee",
    "backgroundTextStyle": "light",
    "usingComponents": {
      "v-s": "/vant/search/index",
    }
  }
}
