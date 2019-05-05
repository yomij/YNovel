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

const getBook = (params) => {
  console.log(params)
  return req({
    url: '/api/book',
    method: 'get',
    params
  })
}

const getChapter = (params) => {
  return req({
    url: '/api/chapter',
    method: 'get',
    params
  })
}

const getChapterList = (params) => {
  return req({
    url: '/api/chapter/t0/list',
    method: 'get',
    params
  })
}

const subscription = data => {
	return req({
		url: '/api/book/subscription',
		method: 'get',
		data
	})
}

const readInfo = data => {
	return req({
		url: '/api/behavior/readinfo',
		method: 'get',
		data
	})
}

export default {
  loginWx,
	getColor,
	getUserInfo,
  getBook,
  getChapter,
  getChapterList,
	subscription,
	readInfo
}
