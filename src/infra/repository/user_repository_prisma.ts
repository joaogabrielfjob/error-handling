import { PrismaClient } from '@prisma/client'
import { User } from '../../domain/entity/user.js'
import { UserRepository } from '../../domain/repository/user_repository.js'
import { CreateResponse } from '../../domain/types/create_response.js'
import { left, right } from '../../util/types/either.js'
import { Result } from '../../util/types/result.js'
import { UserRepositoryError } from '../../domain/error/user_repository_error.js'
import { ReadByEmailResponse } from '../../domain/types/read_by_email_response.js'

export class UserRepositoryPrisma implements UserRepository {

  constructor(private prisma: PrismaClient) { }

  async create({ name, email, password }: User): Promise<CreateResponse> {
    try {
      await this.prisma.user.create({
        data: { name, email, password }
      })

      return right(Result.ok())
    } catch(exception) {
      console.error(exception)
      

      return left(Result.fail(UserRepositoryError.UnableToCreate.create(name)))
    }
  }

  async readByEmail(email: string): Promise<ReadByEmailResponse> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } })

      if (user) return right(Result.ok(new User({ ...user })))

      return left(Result.fail(UserRepositoryError.UserNotFound.create(email)))
    } catch(exception) {
      console.error(exception)
      

      return left(Result.fail(UserRepositoryError.UnableToReadByEmail.create(email)))
    }
  }
}
