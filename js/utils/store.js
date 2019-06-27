/* global chrome */
// import { beforeDawnTimestamp } from './utils.js'

const getHistory = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('history', ({ history }) => {
      if (history) {
        resolve(JSON.parse(history))
      } else {
        // 没有记录诶!
        resolve([])
      }
    })
  })
}

const getStorage = (k) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('pageCounter', ({ pageCounter }) => {
      if (pageCounter) {
        resolve(JSON.parse(pageCounter))
      } else {
        // 没有记录诶!
        resolve({ count: 0 })
      }
    })
  })
}

const setStorage = (k, v) => {
  v = JSON.stringify(v)
  chrome.storage.sync.set({ k: v })
}

export default {
  set count (_int) {
    setStorage('count', _int)
  },
  get storage () {
    return getStorage()
  },
  set history (data) {
    const history = JSON.stringify(data)
    chrome.storage.sync.set({ history })
  },
  get history () {
    return getHistory()
  }
}
