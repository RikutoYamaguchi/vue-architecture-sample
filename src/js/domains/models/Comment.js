import { Model } from '@vuex-orm/core'
import Post from '@models/Post'
import User from '@models/User'

class Comment extends Model {
  static entity = 'comments'

  static fields () {
    return {
      id: this.attr(null),
      postId: this.attr(null),
      userId: this.attr(null),
      context: this.string(''),
      post: this.belongsTo(Post, 'postId'),
      author: this.belongsTo(User, 'userId'),
    }
  }
}

export default Comment
