// /* global chrome */
// eslint-disable-next-line
import { log, beforeDawnTimestamp } from './utils.js'

import badge from './badge.js'
import events from './events.js'
import actions from './actions.js'
import store from './store.js'

export default {
  badge,
  events,
  store,
  ...actions
}
