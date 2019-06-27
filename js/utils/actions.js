/* global chrome */
import { log, beforeDawnTimestamp } from './utils.js'

export default {
  setNewDayAlarm () {
    chrome.alarms.create('newDayComes', { when: beforeDawnTimestamp('tomorrow') })
  },
  clearStorage (k) {
    chrome.storage.sync.remove(k)
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
    const { count } = await browser.store.count
    // 将昨日数据存入 history
    browser.pushToHistroy(count)
    // clear 昨日数据
    browser.clearStorage()
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
