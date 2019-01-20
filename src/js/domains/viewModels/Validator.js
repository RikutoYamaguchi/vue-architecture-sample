import isEmail from 'validator/lib/isEmail'
import _ from 'lodash'

class Validator {
  static email (value) {
    if (_.isString(value)) {
      return isEmail(value)
    }
    return false
  }

  static required (value) {
    return !_.isEmpty(value)
  }

  static max (value, length) {
    if (_.isString(value) || _.isArray(value)) {
      return value.length <= length
    }
    if (_.isNumber(value)) {
      return value <= length
    }

    return false
  }

  static min (value, length) {
    if (_.isString(value) || _.isArray(value)) {
      return value.length >= length
    }
    if (_.isNumber(value)) {
      return value >= length
    }

    return false
  }

  static between (value, { min, max }) {
    return Validator.min(value, min) && Validator.max(value, max)
  }

  static confirmed (value, confirmValue) {
    return value == confirmValue
  }
}

export default Validator
