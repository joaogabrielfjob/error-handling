import { User } from '../entity/user.js'

export interface UserRepository {

  create(user: User): Promise<void>

  read(email: string): Promise<User>
}
