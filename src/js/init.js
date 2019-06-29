import browser from './utils/browser.js'
const { log } = console

const __main = () => {
  browser.on('installed', () => {
    log('恭喜安装 app 噢')
  })
}

__main()
