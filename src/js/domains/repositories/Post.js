import Infrastructure from '@infrastructures/Post'
import PostModel from '@models/Post'

const infrastructure = new Infrastructure()

class Post extends PostModel {
  constructor () {
    super()
    this.infrastructure = infrastructure
  }
}

export default Post
