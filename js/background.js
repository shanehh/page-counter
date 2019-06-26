/* eslint-disable */
import browser from './utils/browser.js'
import { log, dir } from './utils/utils.js'
/* eslint-enable */

const browserStart = () => {
  log('浏览器启动咯')
  browser.badgeText = '...'
  browser.addCounting()
}

const __main = async () => {
  // browser.badgeColor = '#ff0099'
  browserStart()
  browser.onNewViewPage = async (tabId, newUrl, tab) => {
    // log('tabs', tabId, newUrl, tab)
    browser.addCounting()
  }
}

__main()
