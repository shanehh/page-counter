import browser from './utils/browser.js'
const { log } = console

const __main = () => {
  browser.onInstalled = () => {
    log('恭喜安装 app 噢')
    // 设置闹钟
    browser.testAlram()
  }
}

__main()
