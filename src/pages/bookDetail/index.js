import BD from './index.vue'
import Vue from 'vue'

const app = new Vue( BD )

app.$mount()

export default {
	config: {
		navigationStyle: 'custom',
		usingComponents: {
			'van-popup': '/vant/popup/index'
		}
	}
}
