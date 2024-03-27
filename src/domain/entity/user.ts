import { Either, left, right } from '../../util/types/either.js'
import { Result } from '../../util/types/result.js'
import { UserError } from '../error/user_error.js'

type UserProps = { name: string, email: string, password: string }

export interface User extends UserProps { }

type Response = Either<
  UserError.NameInvalidError |
  UserError.EmailInvalidError |
  UserError.PasswordInvalidError,

  Result<User>
>

export class User {

  constructor({ name, email, password }: UserProps) {
    this.name = name
    this.email = email
    this.password = password
  }

  create(): Response {
    if (!this.name || !this.name.trim().length) {
      return left(UserError.NameInvalidError.create(this.name))
    }

    if (!this.email || !this.email.trim().length || !this.email.includes('@')) {
      return left(UserError.EmailInvalidError.create(this.email))
    }
    
    if (!this.password || !this.password.trim().length || this.password.trim().length < 4) {
      return left(UserError.PasswordInvalidError.create(this.password))
    }

    const user = new User({ name: this.name, email: this.email, password: this.password })
  
    return right(Result.ok(user))
  }
}
