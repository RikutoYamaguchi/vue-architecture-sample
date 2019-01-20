import CommentModel from '@models/Comment'
import { app } from '@helpers'

const commentInfrastructure = app('Infrastructures/Comment')

class Comment extends CommentModel {
  constructor () {
    super()
  }
}

export default Comment
