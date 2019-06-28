/* eslint-disable */
import browser from './utils/browser.js'
import { log, dir, beforeDawnTimestamp } from './utils/utils.js'
/* eslint-enable */

const browserStart = async () => {
  log('浏览器启动!')
  // 比较日期, 是否为今日记录
  const recordDate = await browser.store.recordDate
  const today = beforeDawnTimestamp('today')
  if (recordDate !== today) {
    log('新的一日')
    /**
     * push to history
     * clear count
     * reset record date
     */
    const c = await browser.store.count
    if (c) {
      browser.pushToHistroy(recordDate, {
        count: c,
        msg: `I'm happy!`
      })
      browser.store.count = 0
    }
    browser.store.recordDate = today
  }
  browser.addCounting()
}

const __main = async () => {
  browserStart()
  browser.on('newViewPage', async (tabId, newUrl, tab) => {
    // log('tabs', tabId, newUrl, tab)
    browser.addCounting()
  })
  browser.on('storeChange', {
    item: 'count',
    callback (value) {
      browser.badge.text = value
      if (value >= 5) {
        browser.badge.color = '#ff0000'
      }
    }
  })
}

__main()
