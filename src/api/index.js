import req from '@/utils/request'

const loginWx = (data) => req({
  url: '/api/user/WXlogin',
  method: 'post',
  data
})

const getColor = (params) => req({
	url: '/api/book/t0/color',
	method: 'get',
	params
})

export default {
  loginWx,
	getColor
}
