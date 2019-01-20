class HttpConnectionError extends Error {
  constructor (message = null) {
    super()
    this.message = message || '通信に失敗しました。'
  }
}

export default HttpConnectionError
