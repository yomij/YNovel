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

const getUserInfo = (params) => req({
	url: '/api/user',
	method: 'get',
	params
})

export default {
  loginWx,
	getColor,
	getUserInfo
}
