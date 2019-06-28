/* eslint-disable */
import browser from './utils/browser.js'
import { log, dir, beforeDawnTimestamp } from './utils/utils.js'
/* eslint-enable */

const browserStart = async () => {
  browser.badge.text = '...'
  browser.addCounting()
  const r = await browser.hadSetAlarm('newDayComes')
  log('r', r)
}

const __main = async () => {
  browserStart()
  // daily refresh~
  browser.on('alarm', {
    alarmName: 'newDayComes',
    callback () {
      log('newDayComes')
      browser.refresh()
      browser.setNewDayAlarm()
    }
  })
  browser.on('newViewPage', async (tabId, newUrl, tab) => {
    // log('tabs', tabId, newUrl, tab)
    browser.addCounting()
  })
  browser.on('storeChange', {
    item: 'history',
    callback () {
      log('回调函数内容!')
    }
  })
  browser.on('storeChange', {
    item: 'count',
    callback (value) {
      browser.badge.text = value
    }
  })
}
__main()
