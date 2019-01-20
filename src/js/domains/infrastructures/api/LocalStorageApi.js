import localForage from 'localforage'
import { Debugger } from '@helpers'

const EXPIRE_KEY_PREFIX = 'expires-'

class LocalStorageApi {
  /**
   * class LocalStorage
   * localForageを拡張したクラス
   * @param name
   */
  constructor (name) {
    this.storage = localForage.createInstance({ name })
  }

  /**
   * 期限付きで値を保存
   * @param key
   * @param value
   * @param expires hours
   */
  async _setItem (key, value, expires = 0) {
    const expiresKey = this._expiresKey(key)

    // 期限が設定されていない場合は値のみ保存
    if (expires === 0) {
      return this.storage.setItem(key, value)
    }

    const expiresTime = (new Date()).getTime() + (expires * 60 * 60 * 1000)

    Debugger.info('LocalStorage.setItem()')
    Debugger.log('key', key)
    Debugger.log('data', value)

    const [result] = await Promise.all([
      this.storage.setItem(key, value),
      this.storage.setItem(expiresKey, expiresTime),
    ])

    return result
  }

  /**
   * 値の取得
   * 期限が切れている場合は削除する
   * @param key
   * @returns {Promise<any>}
   */
  async _getItem (key) {
    const expiresKey = this._expiresKey(key)
    const [result, expires] = await Promise.all([
      this.storage.getItem(key),
      this.storage.getItem(expiresKey),
    ])

    Debugger.info('LocalStorage.getItem()')
    Debugger.log('key', key)
    Debugger.log('data', result)

    // 期限が設定されていない場合は値を返す
    if (expires === null) {
      return result
    }

    const currentTime = (new Date()).getTime()

    // 期限切れ
    if (currentTime > expires) {
      await Promise.all([
        this.storage.removeItem(key),
        this.storage.removeItem(expiresKey),
      ])

      return null
    }

    return result
  }

  /**
   * 期限用のキー名を生成する
   * @param key
   * @returns {string}
   */
  _expiresKey (key) {
    return EXPIRE_KEY_PREFIX + key
  }
}

export default LocalStorageApi
