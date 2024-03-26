import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entity/user.js';
import { UserRepository } from '../../domain/repository/user_repository.js'

export class UserRepositoryPrisma implements UserRepository {

  constructor(private prisma = new PrismaClient()) { }

  async create({ name, email, password }: User): Promise<Error | void> {
    try {
      await this.prisma.user.create({
        data: { name, email, password }
      })
    } catch(exception) {
      return new Error('Unable to create user!')
    }
  }

  async read(email: string): Promise<Error | User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { email } })

      return new User({ ...user })
    } catch(exception) {
      return new Error('Unable to find user!')
    }
  }
}
