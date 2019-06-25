/* eslint-disable */
import browser from './utils/browser.js'
import { log, dir } from './utils/utils.js'

/* eslint-enable */

const __main = async () => {
  // browser.badgeColor = '#ff0099'
  browser.badgeText = '...'
  browser.onNewViewPage = async (tabId, newUrl, tab) => {
    // log('tabs', tabId, newUrl, tab)
    // 读取 count
    let { count } = await browser.storage
    browser.badgeText = ++count
    browser.storage = { count }
  }
}

__main()
