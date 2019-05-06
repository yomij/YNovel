import req from '@/utils/request'

const loginWx = (data) => req({
  url: '/api/user/WXlogin',
  method: 'post',
  data
})

const login = (data) => req({
  url: '/api/user/login',
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
    url: '/api/book/t0',
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

const getChapterListMore = (params) => {
  return req({
    url: '/api/chapter/t0/list/more',
    method: 'get',
    params
  })
}

const subscription = data => {
	return req({
		url: '/api/subscription',
		method: 'post',
		data
	})
}

const lastRead = data => {
  return req({
    url: '/api/subscription/lastread',
    method: 'post',
    data
  })
}

const unsubscription = data => {
  return req({
    url: '/api/subscription',
    method: 'delete',
    data
  })
}

const overhead = data => {
  return req({
    url: '/api/subscription/overhead',
    method: 'post',
    data
  })
}

const unOverhead = data => {
  return req({
    url: '/api/subscription/unoverhead',
    method: 'post',
    data
  })
}

const verify = data => {
  return req({
    url: '/api/user/verify',
    method: 'post',
    data
  })
}

const verifycode = data => {
  return req({
    url: '/api/user/verifycode',
    method: 'post',
    data
  })
}

const mianPage = data => {
  return req({
    url: '/api/book/t0/main',
    method: 'get',
    data
  })
}

const preSearch = data => {
  return req({
    url: '/api/book/t0/presearch',
    method: 'get',
    data
  })
}

const search = data => {
  return req({
    url: '/api/book/t0/search',
    method: 'get',
    data
  })
}

const chapterComment = data => {
  return req({
    url: '/api/comment/t0/chapter',
    method: 'get',
    queryToken: true,
    data
  })
}

const addChapterComment = data => {
  return req({
    url: '/api/comment/chapter',
    method: 'post',
    queryToken: true,
    data
  })
}

const likeComment = data => {
  return req({
    url: '/api/comment/like',
    method: 'post',
    data
  })
}

const unlikeComment = data => {
  return req({
    url: '/api/comment/unlike',
    method: 'post',
    data
  })
}

const grade = data => {
 return req({
   url: '/api/behavior/grade',
   method: 'post',
   data
 })
}


const recommend = () => {
  return req({
    url: '/api/book/recommend',
    method: 'get',
    // queryToken: true
  })
}

const behavior = (data) => {
  return req({
    url: '/api/behavior/add',
    method: 'post',
    // queryToken: true
    data
  })
}


const readInfo = () => {
	return req({
		url: '/api/behavior/readinfo',
		method: 'get'
	})
}

const problem = data => {
  return req({
    url: '/api/user/problem',
    method: 'post',
    data
  })
}

export default {
  login,
  loginWx,
	getColor,
	getUserInfo,
  getBook,
  getChapter,
  getChapterList,
  getChapterListMore,
	subscription,
  overhead,
  unOverhead,
  unsubscription,
  verify, // 验证验证码
  verifycode, // 发送验证码
  mianPage,
  search,
  chapterComment,
  addChapterComment, // 章节评论
  preSearch,
  lastRead,
  likeComment,
  unlikeComment,
  grade,
  recommend,
  behavior,
	readInfo,
  problem
}
