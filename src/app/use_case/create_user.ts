import { User } from '../../domain/entity/user.js'
import { UserRepository } from '../../domain/repository/user_repository.js'
import { Either, left, right } from '../../util/types/either.js'
import { Result } from '../../util/types/result.js'
import { CreateUserError } from '../error/create_user_error.js'

type CreateUserRequest = { name: string, email: string, password: string }

type Response = Either<
  CreateUserError.EmalAlreadyUsed,

  Result<void>
>

export class CreateUser {
  
  constructor(readonly repo: UserRepository) { }

  async do({ name, email, password }: CreateUserRequest): Promise<Response> {
    const user = new User({ name, email, password }).create()

    if (user.isLeft()) return left(user.value)

    const duplicatedUser = await this.repo.readByEmail(email)

    if (duplicatedUser.isRight()) return left(CreateUserError.EmalAlreadyUsed.create(email))

    await this.repo.create(user.value.getValue())

    return right(Result.ok())
  }
}
