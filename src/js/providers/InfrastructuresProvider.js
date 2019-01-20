import Provider from '@providers/Provider'

import User from '@infrastructures/User'
import Post from '@infrastructures/Post'
import Comment from '@infrastructures/Comment'

class InfrastructuresProvider extends Provider {
  constructor () {
    super('Infrastructures')
  }

  register () {
    this.singleton(User)
    this.singleton(Post)
    this.singleton(Comment)
  }
}

export default InfrastructuresProvider
