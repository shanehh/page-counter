/* global chrome */
/* eslint accessor-pairs: 0 */

export default {
  installed (callback) {
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        callback()
      }
    })
  },
  newViewPage (callback) {
    /**
     * INFO:
     * 此 api -- onUpdated 在确认页面的确有更新, 才会回传值
     * 所以判断 url, 便能确认是否 new page view
     */
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (!changeInfo.url) {
        return
      }
      callback(tabId, changeInfo.url, tab)
    })
  },
  storeChange ({ item, callback }) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.hasOwnProperty(item)) {
        const { newValue } = changes[item]
        callback(newValue)
      }
    })
  },
  alarm ({ alarmName, callback }) {
    chrome.alarms.onAlarm.addListener(({ name }) => {
      if (name === alarmName) {
        callback()
      }
    })
  }
}
