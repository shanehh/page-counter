/* global chrome */
/* eslint accessor-pairs: 0 */

export default {
  set onInstalled (callback) {
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        callback()
      }
    })
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
  set onStoreChange (callback) {
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      for (var key in changes) {
        var storageChange = changes[key]
        console.log('Storage key "%s" in namespace "%s" changed. ' +
          'Old value was "%s", new value is "%s".',
        key,
        namespace,
        storageChange.oldValue,
        storageChange.newValue)
      }
      callback()
    })
  },
  onceAlarm (alarmName, callback) {
    chrome.alarms.onAlarm.addListener(({ name }) => {
      if (name === alarmName) {
        callback()
      }
    })
  }
}
