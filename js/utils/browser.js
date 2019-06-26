/* global chrome */
// eslint-disable-next-line
import { log, beforeDawnTimestamp } from './utils.js'

const getBadgeText = () => {
  return new Promise((resolve, reject) => {
    chrome.browserAction.getBadgeText({}, (result) => {
      resolve(result)
    })
  })
}

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

const getStorage = () => {
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

/**
 * @get badgeText 需要使用 await
 * @get storage 需要使用 await
 */
export default {
  data: [],
  set onInstalled (callback) {
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        callback()
      }
    })
  },
  set badgeText (text) {
    const o = {
      text: String(text)
    }
    chrome.browserAction.setBadgeText(o)
  },
  get badgeText () {
    return getBadgeText()
  },
  set badgeColor (color) {
    chrome.browserAction.setBadgeBackgroundColor({ color })
  },
  set onNewViewPage (callback) {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      /**
       * INFO:
       * 此 api -- onUpdated 在确认页面的确有更新, 才会回传值
       * 所以判断 url, 便能确认是否 new page view
       */
      if (!changeInfo.url) {
        return
      }
      callback(tabId, changeInfo.url, tab)
    })
  },
  set storage (data) {
    const pageCounter = JSON.stringify(data)
    chrome.storage.sync.set({ pageCounter })
  },
  set history (data) {
    const history = JSON.stringify(data)
    chrome.storage.sync.set({ history })
  },
  get history () {
    return getHistory()
  },
  async pushToHistroy (count) {
    const browser = this
    const data = {
      count,
      date: beforeDawnTimestamp('yesterday')
    }
    const h = await browser.history
    h.push(data)
    browser.history = h
  },
  get storage () {
    return getStorage()
  },
  clearStorage () {
    chrome.storage.sync.remove('pageCounter')
  },
  async addCounting () {
    const browser = this
    let { count } = await browser.storage
    browser.badgeText = ++count
    browser.storage = { count }
  },
  async refresh () {
    const browser = this
    const { count } = await browser.storage
    // 将昨日数据存入 history
    browser.pushToHistroy(count)
    // clear 昨日数据
    browser.clearStorage()
    browser.badgeText = '...'
  },
  setNewDayAlarm () {
    chrome.alarms.create('newDayComes', { when: beforeDawnTimestamp('tomorrow') })
  },
  // testAlram () {
  //   console.log('闹钟设置成功')
  //   chrome.alarms.create('test', { when: Date.now() + 60 * 1000 })
  // },
  onceAlarm (alarmName, callback) {
    chrome.alarms.onAlarm.addListener(({ name }) => {
      if (name === alarmName) {
        callback()
      }
    })
  }
}
