import { FastifyInstance } from "fastify";
import { CreateUserController } from "./controller/auth/CreateUserController";
import { LoginUserController } from "./controller/auth/LoginUserController";
import { GetUserController } from "./controller/auth/GetUserController";
import { authenticateToken } from "./middleware/authenticateToken";
import { AddRegisteredMomentsController } from "./controller/moments/AddRegisteredMoments";
import { GetAllMomentsController } from "./controller/moments/GetAllMomentsController";


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
      return new AddRegisteredMomentsController().handle(request, reply)     
    }) 
   
    fastify.get('/get-all-moments', {preHandler: authenticateToken}, async(request, reply) => {
      return new GetAllMomentsController().handle(request, reply)     
    }) 
    
}