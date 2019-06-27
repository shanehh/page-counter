// http://api.waqi.info/feed/shanghai/?token=demo
// eslint-disable-next-line
import { log, dir } from './utils/utils.js'
import browser from './utils/browser.js'

const __main = async () => {
  const app = document.querySelector('#app')
  log('app', app)
  const history = await browser.store.history
  log('', history)
}

__main()
