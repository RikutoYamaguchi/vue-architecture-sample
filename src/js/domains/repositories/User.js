import Infrastructure from '@infrastructures/User'
import UserModel from '@models/User'

const infrastructure = new Infrastructure()

class User extends UserModel {
  constructor () {
    super()
    this.infrastructure = infrastructure
  }
}

export default User
