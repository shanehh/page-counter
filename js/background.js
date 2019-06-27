/* eslint-disable */
import browser from './utils/browser.js'
import { log, dir, beforeDawnTimestamp } from './utils/utils.js'
/* eslint-enable */

const browserStart = () => {
  // log('浏览器启动咯')
  browser.badgeText = '...'
  browser.addCounting()
}

const __main = async () => {
  browserStart()
  // daily refresh~
  browser.onceAlarm('newDayComes', () => {
    log('newDayComes')
    browser.refresh()
    browser.setNewDayAlarm()
  })
  browser.onNewViewPage = async (tabId, newUrl, tab) => {
    // log('tabs', tabId, newUrl, tab)
    browser.addCounting()
  }
}

// __main()
browser.badgeText = 1
log('test', browser)
