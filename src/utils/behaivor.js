/**
 * behaivor: Object
 * {
 *   bookId => String： [
 *     {
 *       type => Number：{ // 1 点击（书籍首页）2 阅读（章节） 3 阅读（时间） 4 分享 5 订阅 (时时)
 *          count: Number
 *       }，
 *       extra => Any
 *     }
 *   ]
 * }
 */

import api from '@/api'

const ex = {
  book: {
    0: {
      count: 0,
      extara: {}
    },
    lastUpdate: new Date()
  }
}

export default {
  addbev(bookId, type, count, extra = null) {
    let b = Megalo.getStorageSync('behavior') || {}
    if (bookId in b) {
      if (!(type in b[bookId])){
        b[bookId][type] =  {
          count: 0,
          extara: null
        }
      }
      b[bookId][type]['count'] += (count || 1 )
      if (extra) b[bookId][type]['extra'] = extra
    } else {
      b[bookId] = {
        [type]: {
          count,
          extra
        }
      }
    }
    if (type !== 1) {
      b[bookId].lastUpdate = new Date().getTime()
    }
    console.log(JSON.stringify(b))
    Megalo.setStorage({
      key: 'behavior',
      data: b
    })
  },
  getBev() {
    return Megalo.getStorageSync('behavior')
  },
  removeBev() {
    return Megalo.removeStorageSync('behavior')
  },
  uploadBev() {
    const bev = this.getBev()
    bev && api.behavior({
      bev
    }).then(res => {
      if(res.status === 200) {
        this.removeBev()
      }
    })
  }
}