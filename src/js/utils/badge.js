/* global chrome */
const getBadgeText = () => {
  return new Promise((resolve, reject) => {
    chrome.browserAction.getBadgeText({}, (result) => {
      resolve(result)
    })
  })
}

export default {
  set text (text) {
    const o = {
      text: String(text)
    }
    chrome.browserAction.setBadgeText(o)
  },
  get text () {
    return getBadgeText()
  },
  set color (color) {
    chrome.browserAction.setBadgeBackgroundColor({ color })
  }
}
