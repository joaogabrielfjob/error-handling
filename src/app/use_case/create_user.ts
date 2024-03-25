import { User } from '../../domain/entity/user.js'
import { UserRepository } from '../../domain/repository/user_repository.js'

type CreateUserRequest = { name: string, email: string, password: string }

export class CreateUser {
  
  constructor(private repo: UserRepository) { }

  async handle({ name, email, password }: CreateUserRequest) {
    const user = new User({ name, email, password })

    const duplicatedUser = await this.repo.read(email)

    if (duplicatedUser) throw new Error('Email already registered!')

    await this.repo.create(user)
  }
}