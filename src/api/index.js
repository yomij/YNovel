import req from '@/utils/request'

const loginWx = (data) => req({
  url: '/api/wx/login',
  method: 'post',
  data
})

export default {
  loginWx
}