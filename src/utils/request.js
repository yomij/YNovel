import qs from 'qs'
const BASE_URL = 'http://localhost:3100'
// const BASE_URL = 'http://23s7k31667.imwork.net:38560'
/**
 * @Description 请求方法
 * @Param options {
 *   method: get || post 默认get
 *   url: 请求url
 *   params: 请求参数
 *   resType:  默认 json
 * }
 * @return Promise
 **/
const request = options => {
  const header =  { 'Content-Type': 'application/json;charset=utf-8' }
  let {method = 'get', url, resType = 'json', data} = options
  if (!url) {
    console.log('Request Without Url')
    return new Promise()
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
