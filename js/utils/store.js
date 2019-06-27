/* global chrome */
// eslint-disable-next-line
import { log } from './utils.js'

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

export default {
  set count (_int) {
    setStorage('count', _int)
  },
  get count () {
    return getStorage('count', 1)
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
