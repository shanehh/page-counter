/* global chrome */
// eslint-disable-next-line
import { calendar, log } from './utils.js'

const getStorage = (k, defaltValue) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(k, (resulte) => {
      const data = resulte[k]
      if (data) {
        resolve(JSON.parse(data))
      } else {
      // 没有记录诶!
        resolve(defaltValue)
      }
    })
  })
}

const setStorage = (k, v) => {
  v = JSON.stringify(v)
  chrome.storage.sync.set({ [k]: v })
}

const clearStorage = (item) => {
  chrome.storage.sync.remove(item)
}

const getRecordDate = async () => {
  const d = await getStorage('recordDate', null)
  if (d) {
    return d
  } else {
    const today = calendar('today')
    setStorage('recordDate', today)
    return today
  }
}

export default {
  set count (_int) {
    setStorage('count', _int)
  },
  get count () {
    return getStorage('count', 0)
  },
  set recordDate (_date) {
    setStorage('recordDate', _date)
  },
  get recordDate () {
    // 如果没有记录, 日期设为今天, 并返回
    return getRecordDate()
  },
  set history (_arr) {
    setStorage('history', _arr)
  },
  get history () {
    return getStorage('history', [])
  },
  clear (item = 'count') {
    clearStorage(item)
  }
}
