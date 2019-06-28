/* global chrome */
// eslint-disable-next-line
import { log, beforeDawnTimestamp } from './utils.js'

const getAlarm = (alarmName) => {
  return new Promise((resolve, reject) => {
    chrome.alarms.getAll((alarms) => {
      alarms.forEach(alarm => {
        if (alarm.name === alarmName) {
          resolve(alarm)
        } else {
          resolve(false)
        }
      })
    })
  })
}

export default {
  setNewDayAlarm () {
    // chrome.alarms.create('newDayComes', { when: beforeDawnTimestamp('tomorrow') })
    // FOR TEST
    log('set clock')
    chrome.alarms.create('newDayComes', { when: Date.now() + 61 * 1000 })
  },
  async hadSetAlarm (alarmName) {
    return getAlarm(alarmName)
  },
  async addCounting () {
    const browser = this
    let count = await browser.store.count
    // save the change
    browser.store.count = ++count
  },
  async refresh () {
    const browser = this
    const count = await browser.store.count
    // 将昨日数据存入 history
    browser.pushToHistroy(count)
    // clear counter
    // 设置 0 是因为, 并不是刷新窗口
    browser.store.count = 0
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
