import LocalStorageApi from '@infrastructures/api/LocalStorageApi'

class Comment extends LocalStorageApi {
  constructor () {
    super('comments')
  }

  async getAll () {
    return await this._getItem('all')
  }
}

export default Comment
