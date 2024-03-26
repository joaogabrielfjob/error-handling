import { User } from '../entity/user.js'

export interface UserRepository {

  create(user: User): Promise<Error | void>

  read(email: string): Promise<Error | User>
}
