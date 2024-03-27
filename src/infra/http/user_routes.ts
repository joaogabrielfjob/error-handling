import { FastifyInstance } from 'fastify'
import { createUserController } from '../../controller/create_user_controller.js'

export async function userRoutes(server: FastifyInstance) {
  server.post('/user', createUserController)
}
