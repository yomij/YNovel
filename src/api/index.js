import req from '@/utils/request'

const loginWx = (data) => req({
  url: '/api/wx/login',
  method: 'post',
  data
})

const getColor = (params) => req({
	url: '/api/book/color',
	method: 'get',
	params
})

export default {
  loginWx,
	getColor
}
