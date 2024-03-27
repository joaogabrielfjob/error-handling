import { fastify } from 'fastify'
import { userRoutes } from './infra/http/user_routes.js'

const server = fastify()

server.register(userRoutes)

server
  .listen({ port: 7777 })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:7777')
  })
