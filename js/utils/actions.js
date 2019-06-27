/* global chrome */
/* eslint accessor-pairs: 0 */
import { beforeDawnTimestamp } from './utils.js'

export default {
  async pushToHistroy (count) {
    const browser = this
    const data = {
      count,
      date: beforeDawnTimestamp('yesterday')
    }
    const h = await browser.history
    h.push(data)
    browser.history = h
  },
  clearStorage () {
    chrome.storage.sync.remove('pageCounter')
  },
  async addCounting () {
    const browser = this
    let { count } = await browser.storage
    browser.badgeText = ++count
    browser.storage = { count }
  },
  async refresh () {
    const browser = this
    const { count } = await browser.storage
    // 将昨日数据存入 history
    browser.pushToHistroy(count)
    // clear 昨日数据
    browser.clearStorage()
    browser.badgeText = '...'
  },
  setNewDayAlarm () {
    chrome.alarms.create('newDayComes', { when: beforeDawnTimestamp('tomorrow') })
  }
}
