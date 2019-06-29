// /* global chrome */
// eslint-disable-next-line
import { log, calendar } from './utils.js'

import badge from './badge.js'
import events from './events.js'
import actions from './actions.js'
import store from './store.js'

export default {
  badge,
  store,
  ...actions,
  on (eventName, callback) {
    events[eventName](callback)
  }
}
