import pc from './index.vue'
import Vue from 'vue'

const app = new Vue( pc )

app.$mount()

export default {
	config: {
		navigationBarTitleText: '我',
		"navigationBarTextStyle": "black",
		"usingComponents": {
			"van-field": "/vant/field/index",
			"van-toast": "/vant/toast/index"
		}
	}
}
