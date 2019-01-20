import { Model } from '@vuex-orm/core'
import User from '@models/User'

class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.attr(null),
      userId: this.attr(null),
      title: this.string(''),
      body: this.string(''),
      author: this.belongsTo(User, 'userId'),
      comments: this.hasMany(),
    }
  }
}

export default Post
