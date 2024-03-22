import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entity/user.js';
import { UserRepository } from '../../domain/repository/user_repository.js'

export class UserRepositoryPrisma implements UserRepository {

  constructor(private prisma: PrismaClient) { }

  async create({ name, email, password }: User): Promise<void> {
    try {
      await this.prisma.user.create({
        data: { name, email, password }
      })
    } catch(exception) {
      throw new Error('Unable to create user!')
    }
  }

  async read(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { email } })

      return new User({ ...user })
    } catch(exception) {
      throw new Error('Unable to find user!')
    }
  }
}