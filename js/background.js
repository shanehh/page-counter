const log = console.log.bind(console)

const newViewPage = callback =>
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url) {
      return
    }
    callback(tabId, changeInfo.url, tab)
  })

const setText = text =>
  chrome.browserAction.setBadgeText({
    text: String(text)
  })

const setColor = color =>
  chrome.browserAction.setBadgeBackgroundColor({ color })

;(async function main () {
  let n = 1
  newViewPage((tabId, newUrl, tab) => {
    log('tabs', tabId, newUrl, tab)
    n += 1
    setText(n)
  })
})()
