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

export default {
  loginWx,
	getColor,
  getBook,
  getChapter,
  getChapterList
}
