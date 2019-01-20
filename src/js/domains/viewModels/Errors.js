import _ from 'lodash'

class Errors {
  _all = {}

  constructor (updateMethod) {
    this.updateMethod = updateMethod
  }

  _exist (key) {
    return _.has(this._all, key) && _.isArray(this._all[key])
  }

  has (key) {
    return this._exist(key) && this._all[key].length > 0
  }

  add (error) {
    const { key, message } = error
    if (this._exist(key)) {
      this._all[key].push(message)
    }

    this._all[key] = [message]
    this.updateMethod()
  }

  clear () {
    this._all = {}
    this.updateMethod()
  }

  remove (key) {
    _.unset(this._all, key)
    this.updateMethod()
  }

  get (key) {
    if (!this.has(key)) {
      return null
    }

    return this._all[key]
  }

  all () {
    let messages = []
    _.each(this._all, error => messages = _.concat(messages, error))
    return messages
  }

  any () {
    return !_.isEmpty(this._all)
  }
}

export default Errors
