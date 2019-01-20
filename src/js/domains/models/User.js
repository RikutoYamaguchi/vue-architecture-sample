import { Model } from '@vuex-orm/core'
import Post from '@models/Post'

class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      posts: this.hasMany(Post, 'userId'),
    }
  }
}

export default User
