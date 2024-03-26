import { User } from '../../domain/entity/user.js'
import { UserRepository } from '../../domain/repository/user_repository.js'

type CreateUserRequest = { name: string, email: string, password: string }

export class CreateUser {
  
  constructor(readonly repo: UserRepository) { }

  async do({ name, email, password }: CreateUserRequest): Promise<Error | void> {
    const user = new User({ name, email, password })

    const duplicatedUser = await this.repo.read(email)

    if (duplicatedUser instanceof User) return new Error('Email already registered!')

    await this.repo.create(user)
  }
}
