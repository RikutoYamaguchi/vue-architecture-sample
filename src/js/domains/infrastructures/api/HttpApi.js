import axios from 'axios'
import { Debugger } from '@helpers'

const METHOD_POST = 'post'
const METHOD_GET = 'get'

class HttpApi {
  /**
   * HTTP API通信の基礎クラス
   * @param apiBaseUrl
   * @param csrf
   * @param csrfKey 非同期通信でレスポンスに含まれるcsrfのkey
   */
  constructor (apiBaseUrl, csrf, csrfKey = null) {
    // 初回の通信にcsrfを受け取る必要がある
    this._csrf = csrf

    this.csrfKey = csrfKey || 'csrf'

    this.axios = axios.create({
      baseURL: apiBaseUrl,
      headers: {
        'X-CSRF-Token': this._csrf,
      },
    })

    this._setResponseInterceptor()
  }

  /**
   * レスポンスに対するインターセプトを定義
   * @private
   */
  _setResponseInterceptor () {
    this.axios.interceptors.response.use(response => {
      // csrf自動更新
      if (response.data[this.csrfKey]) {
        this._csrf = response.data[this.csrfKey]
      }
      return response
    }, error => {
      return Promise.reject(error)
    })
  }

  /**
   * リクエストの送信
   * @param url
   * @param data
   * @param method
   * @returns {AxiosPromise<any>}
   * @private
   */
  _request (url, data, method) {
    let config = this._createConfig({ url, data })
    if (method === METHOD_GET) {
      config = this._createConfig({
        url, params: data,
      })
    }

    Debugger.info('HttpApi._request()')
    Debugger.log('url', url)
    Debugger.log('method', method)
    Debugger.log('data', data)

    return this.axios.request({
      method,
      ...config,
    })
  }

  /**
   * POSTで通信する
   * @param url
   * @param data
   * @returns {AxiosPromise<any>}
   */
  post (url, data = {}) {
    return this._request(url, data, METHOD_POST)
  }

  /**
   * GETで通信する
   * @param url
   * @param params
   * @returns {AxiosPromise<any>}
   */
  get (url, params = {}) {
    return this._request(url, params, METHOD_GET)
  }

  /**
   * config生成ヘルパー
   * @param url
   * @param data
   * @param params
   * @returns {*}
   * @private
   */
  _createConfig ({ url, data = null, params = null }) {
    let created = {}
    if (data) {
      created = { url, data }
    }

    if (params) {
      created = { url, params }
    }

    // csrf最新版をconfigに追加
    return {
      ...created,
      headers: {
        'X-CSRF-Token': this._csrf,
      },
    }
  }
}

export default HttpApi
