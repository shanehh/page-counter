/* eslint-disable */
import browser from './utils/browser.js'
import { log, dir, beforeDawnTimestamp } from './utils/utils.js'
/* eslint-enable */

const browserStart = () => {
  browser.badge.text = '...'
  browser.addCounting()
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
  browser.on('storeChange', () => {
    log('回调函数内容!')
  })
}
__main()
