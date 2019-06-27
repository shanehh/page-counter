/* global chrome */
import { log } from './utils.js'

const getStorage = (k, defaltValue) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(k, (resulte) => {
      log('resulte', resulte)
      if (resulte) {
        // resolve(JSON.parse(k))
        resolve(1)
      } else {
        // 没有记录诶!
        resolve(defaltValue)
      }
    })
  })
}

const setStorage = (k, v) => {
  v = JSON.stringify(v)
  log('设置kv', k, v)
  chrome.storage.sync.set({ k: v })
}

export default {
  set count (_int) {
    setStorage('count', { count: _int })
  },
  get count () {
    return getStorage('count', 1)
  },
  set history (_arr) {
    setStorage('history', _arr)
  },
  get history () {
    return getStorage('history', [])
  }
}
