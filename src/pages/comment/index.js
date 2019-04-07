import Login from './index.vue'
import Vue from 'vue'

const app = new Vue( Login )

app.$mount()

export default {
	config: {
		navigationStyle: 'custom',
		navigationBarTitleText: '章评',
		"usingComponents": {
			"van-field": "/vant/field/index",
			"van-toast": "/vant/toast/index"
		}
	}
}
