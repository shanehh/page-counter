/* global chrome */
const getBadgeText = () => {
  return new Promise((resolve, reject) => {
    chrome.browserAction.getBadgeText({}, (result) => {
      resolve(result)
    })
  })
}

const getStorage = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('pageCounter', ({ pageCounter }) => {
      if (pageCounter) {
        resolve(JSON.parse(pageCounter))
      } else {
        resolve({ count: 1 })
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
  get storage () {
    return getStorage()
  }
}
