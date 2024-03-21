import { User } from '../entity/user.js'

export interface UserRepository {

  create(user: User): void

  read(email: string): User

  update(user: User): void

  delete(email: string): void
}
