import Errors from '@viewModels/Errors'
import HttpConnectionError from '@errors/HttpConnectionError'

export default {
  data () {
    return {
      errors: null,
    }
  },
  methods: {
    async execute (useCase, args) {
      try {
        const _useCase = new useCase(args)
        await _useCase.execute()
      } catch (e) {
        const applyErrors = this.globalErrorHandling(e)

        if (typeof this.errorHandler === 'function') {
          this.errorHandler(e)
        } else if (applyErrors) {
          this.errors.add(e)
        }
      }
    },
    globalErrorHandling (e) {
      if (e instanceof HttpConnectionError) {
        console.log(e.message)
        console.error(e)
        return false
      }

      return true
    },
  },
  created () {
    this.errors = new Errors(this.$forceUpdate)
  },
}
