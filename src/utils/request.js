import megaloRouter  from 'megalo-router'
const BASE_URL = 'http://localhost:3100'
// const BASE_URL = 'http://23s7k31667.imwork.net:38560'
/**
 * @Description 请求方法
 * @Param options {
 *   method: get || post 默认get
 *   url: 请求url
 *   params: 请求参数
 *   resType:  默认 json
 *   needToken: 是否需要token 默认true
 * }
 * @return Promise
 **/


const request = options => {
  let header =  { 'Content-Type': 'application/json;charset=utf-8' }
  let {method = 'get', url, resType = 'json', data, needToken = true} = options
  const token = Megalo.getStorageSync('authorization')
  if (!url) {
    console.log('Request Without Url')
    return new Promise.reject()
  }
  console.log(needToken, token)
  if (needToken && token) {
    header = Object.assign(header, {
      token
    })
  }
  // url = params ? `${url}?${qs.stringify(params)}` : url
  return new Promise((resolve, reject) => {
    Megalo.request({
      url: BASE_URL + url,
      header,
      method: method.toLocaleUpperCase(),
      dataType: resType,
      data
    }).then(res => {
      if (res.statusCode === 401) {
        return megaloRouter.replace('/pages/bookrack/login')
      }
      console.log(header)
      if(res.statusCode >= 200 && res.statusCode < 400) {
        console.log(res.data)
        resolve(res.data)
      } else {
        reject(res.statusCode)
      }
    }).catch(e => {
      reject(e)
    })
  })
}

export default request
