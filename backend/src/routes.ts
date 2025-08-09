import { FastifyInstance } from "fastify";
import { CreateUserController } from "./controller/auth/CreateUserController";
import { LoginUserController } from "./controller/auth/LoginUserController";
import { GetUserController } from "./controller/auth/GetUserController";
import { authenticateToken } from "./middleware/authenticateToken";
import prismaClient from "./prisma";

interface RegisteredMomentsProps {
  title: string
  story: string
  visitedLocation: string[]
  imageUrl: string
  visitedDate: string
}
export function routes(fastify: FastifyInstance){
    fastify.post('/create-account',async (request, reply) => {
       return new CreateUserController().handle(request, reply)                           
    })

    fastify.post('/login',async (request, reply) => {
        return new LoginUserController().handle(request, reply)                           
     })

    fastify.get('/get-user', {preHandler: authenticateToken}, async(request, reply) => {
      return new GetUserController().handle(request, reply)
    })

    fastify.post('/add-registered-moments', {preHandler: authenticateToken}, async(request, reply) => {
      const {title,
      story,
      visitedLocation,
      imageUrl,
      visitedDate} = request.body as RegisteredMomentsProps
      const {user} = request

      if(!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return reply.status(400).send({
          error: true,
          message: 'Todos os campos são obrigatórios!'
        })      
      }

      if(!user) {
        return reply.status(400).send({
          error: true,
          message: 'Usuário não encontrado!'
        })      
      }

      const parsevisitedDate = new Date(parseInt(visitedDate))



      const registeredMoments = await prismaClient.registeredMoment.create({
        data: {
          title: title,
          story: story,
          visitedLocation: visitedLocation,
          imageUrl: imageUrl,
          visitedDate: parsevisitedDate,
          userId: user.userId
        }
      })
      
      reply.status(201).send({moment: registeredMoments})
    })  
}