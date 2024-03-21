import { User } from '../entity/user.js'
import { UserRepository } from '../repository/user_repository.js'

type CreateUserRequest = { name: string, email: string, password: string }

export class CreateUser {
  
  constructor(private repo: UserRepository) { }

  handle({ name, email, password }: CreateUserRequest) {
    const user = new User({ name, email, password })

    const duplicatedUser = this.repo.read(email)

    if (duplicatedUser) throw new Error('Email already registered!')

    this.repo.create(user)
  }
}