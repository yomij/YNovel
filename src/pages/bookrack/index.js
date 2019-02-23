import Login from './login.vue'
import Vue from 'vue'

const app = new Vue( Login )

app.$mount()

export default {
	config: {
		navigationBarTitleText: 'Megalo',
	}
}
