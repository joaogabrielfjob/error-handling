import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUser } from '../app/use_case/create_user.js'
import { z } from 'zod'
import { UserRepositoryPrisma } from '../infra/repository/user_repository_prisma.js'
import { UserError } from '../domain/error/user_error.js'
import { CreateUserError } from '../app/error/create_user_error.js'
import { prisma } from '../infra/prisma/prisma.js'

const schema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  const repository = new UserRepositoryPrisma(prisma)
  const createUser = new CreateUser(repository)

  const { name, email, password } = schema.parse(request.body)

  const result = await createUser.do({ name, email, password })

  if (result.isLeft()) {
    const error = result.value

    switch(error.constructor) {
      case 
      UserError.NameInvalidError,
      UserError.EmailInvalidError,
      UserError.PasswordInvalidError:
        reply.code(422).send(error.getValue().message)
      case CreateUserError.EmalAlreadyUsed:
        reply.code(409).send(error.getValue().message)
      default:
        reply.code(500).send(error.getValue().message)
    }
  }

  reply.code(201).send(result.value.getValue())
}
