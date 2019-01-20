import _ from 'lodash'

const CONSOLE_INFO = 'info'
const CONSOLE_LOG = 'log'

class Debugger {
  static info (text) {
    Debugger.console(CONSOLE_INFO, text)
  }

  static log (heading, context) {
    if (_.isObject(context) || _.isArray(context)) {
      Debugger.console(CONSOLE_LOG, `${heading}:`)
      Debugger.console(CONSOLE_LOG, context)
      return
    }

    Debugger.console(CONSOLE_LOG, `${heading}: ${context}`)
  }

  static console (exportType, context) {
    if (process.env.NODE_ENV !== 'production') {
      switch (exportType) {
        case CONSOLE_INFO:
          console.log(`%c🔊${context}`,
            'color: blue; background: #eee; display: block; padding: 10px;')
          break
        default:
          console.log(context)
      }
    }
  }
}

export default Debugger
