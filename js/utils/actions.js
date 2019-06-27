/* global chrome */
// eslint-disable-next-line
import { log, beforeDawnTimestamp } from './utils.js'

export default {
  setNewDayAlarm () {
    // chrome.alarms.create('newDayComes', { when: beforeDawnTimestamp('tomorrow') })
    // FOR TEST
    log('set clock')
    chrome.alarms.create('newDayComes', { when: Date.now() + 61 * 1000 })
  },
  async addCounting () {
    const browser = this
    let count = await browser.store.count
    // update the badge
    browser.badge.text = ++count
    // save the change
    browser.store.count = count
  },
  async refresh () {
    const browser = this
    const count = await browser.store.count
    // 将昨日数据存入 history
    browser.pushToHistroy(count)
    // clear counter
    // 设置 0 是因为, 并不是刷新窗口
    browser.store.count = 0
    browser.badge.text = '...'
  },
  async pushToHistroy (count) {
    const browser = this
    const data = {
      count,
      date: beforeDawnTimestamp('yesterday')
    }
    const h = await browser.store.history
    h.push(data)
    browser.store.history = h
  }
}
