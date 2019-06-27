/* global chrome */
import { log } from './utils.js'

const getStorage = (k, defaltValue) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([k], function (resulte) {
      log('resulte', resulte)
      // if (resulte) {
      // resolve(JSON.parse(k))
      resolve(1)
      // } else {
      // 没有记录诶!
      // resolve(defaltValue)
      // }
    })
  })
}

const setStorage = (k, v) => {
  v = JSON.stringify(v)
  log('设置kv', k, v)
  chrome.storage.sync.set({ k: v }, function () {
    console.log('Saved', k, typeof v)
  })
}

export default {
  set count (_int) {
    setStorage('pageCount', { count: _int })
  },
  get count () {
    return getStorage('pageCount', 1)
  },
  set history (_arr) {
    setStorage('history', _arr)
  },
  get history () {
    return getStorage('history', [])
  }
}
