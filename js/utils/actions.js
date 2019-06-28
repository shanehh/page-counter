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
  async pushToHistroy (date, data) {
    const browser = this
    const record = {
      date,
      data
    }
    const h = await browser.store.history
    h.push(record)
    browser.store.history = h
    log('我确认存入未被篡改历史!!!!!')
  }
}
