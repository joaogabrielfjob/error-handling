import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUser } from '../app/use_case/create_user.js'
import { z } from 'zod'
import { UserRepositoryPrisma } from '../infra/repository/user_repository_prisma.js'

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  const repository = new UserRepositoryPrisma()
  const createUser = new CreateUser(repository)

  const { name, email, password } = schema.parse(request.body)

  const result = await createUser.do({ name, email, password })

  if (result instanceof Error) reply.code(400).send(result.message)

  reply.code(201).send()
}
