import _ from 'lodash'
import Validator from '@viewModels/Validator'

export default function ({ values = {}, rules = {}, messages = {} }) {
  const errors = {}
  const shouldShowError = {}
  const $_isEdited = {}
  const $_hadInitialValue = {}
  const $_isFocusOuted = {}

  _.each(values, (value, name) => {
    errors[name] = []
    shouldShowError[name] = false
    $_isEdited[name] = false
    $_isFocusOuted[name] = false
    $_hadInitialValue[name] = !_.isEmpty(value)
  })

  return {
    data () {
      return {
        form: {
          values,
          errors,
          shouldShowError,
          $_messages: messages,
          $_rules: rules,
          $_isEdited,
          $_hadInitialValue,
          $_isFocusOuted,
        },
      }
    },
    computed: {
      formShouldShowError () {
        const { form } = this
        return (name) => {
          return (
            form.$_isFocusOuted[name] &&
            (form.$_isEdited[name] || form.$_hadInitialValue[name])
          )
        }
      },
      formAllErrors () {
        const { form } = this
        let messages = []
        _.each(form.errors, error => {
          messages = _.concat(messages, error)
        })
        return messages
      },
    },
    methods: {
      formOnFocusOut (name) {
        const { form } = this
        form.$_isEdited[name] = true
        form.$_isFocusOuted[name] = true
        this.$_formValidateOne(name)
      },
      formOnUpdate (name, value) {
        const { form } = this
        form.values[name] = value
        form.$_isEdited[name] = true
        this.$_formValidateOne(name)
      },
      formValidate () {
        const { form } = this;
        _.each(form.values, (value, name) => {
          this.formOnFocusOut(name)
          this.$_formValidateOne(name)
        })
        return this.formAllErrors.length === 0
      },
      $_formValidateOne (name) {
        const { form } = this
        const formValue = form.values[name]
        if (!this.formShouldShowError(name)) {
          return false
        }
        form.errors[name] = []
        form.shouldShowError[name] = false

        const rules = this.$_formGenerateRule(form.$_rules[name])

        _.each(rules, (paramators, validationName) => {
          if (!Validator[validationName](formValue, paramators)) {
            this.$_formAddError(
              name,
              this.$_formGenerateMessage(name, validationName),
            )
          }
        })
      },
      $_formGenerateRule (ruleStrings) {
        const { form } = this
        const splitRules = ruleStrings.split('|')
        const ruleData = {}
        _.each(splitRules, ruleString => {
          const split = ruleString.split(':')
          const validationName = split[0]
          switch (validationName) {
            case 'required':
              ruleData[split[0]] = null
              break
            case 'confirmed':
              ruleData[split[0]] = form.values[split[1]]
              break
            case 'between':
              const separateParams = split[1].split(',')
              ruleData[split[0]] = {
                min: separateParams[0],
                max: separateParams[1],
              }
              break
            default:
              ruleData[split[0]] = split[1]
              break
          }
        })
        return ruleData
      },
      $_formAddError (name, message) {
        const { form } = this
        form.errors[name].push(message)
        form.shouldShowError[name] = true
      },
      $_formGenerateMessage (name, validationName) {
        const { form } = this
        return form.$_messages[`${name}.${validationName}`]
      },
    },
  }
}
