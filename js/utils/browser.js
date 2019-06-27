// /* global chrome */
// eslint-disable-next-line
import { log, beforeDawnTimestamp } from './utils.js'

import badge from './badge.js'
import events from './events.js'
import actions from './actions.js'
import store from './store.js'

export default {
  // testAlram () {
  //   console.log('闹钟设置成功')
  //   chrome.alarms.create('test', { when: Date.now() + 60 * 1000 })
  // },
  badge,
  events,
  store,
  ...actions
}
