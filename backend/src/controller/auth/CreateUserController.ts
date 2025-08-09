import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserService } from '../../service/auth/CreateUserService'

class CreateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { fullName, email, password } = request.body as { fullName: string, email: string, password: string}
        
        if (!fullName || !email || !password) {
            reply.status(400).send({message: 'Todos os campos são obrigatórios!'})
        }

        try {
          //inicialiso o servico
          const createUserService = new CreateUserService()  
          
          const user = await createUserService.execute({fullName, email, password})

          reply.status(200).send(user)
        } catch (error: any) {
            return reply.status(400).send({erro:true, message: error.message})
        }

    }

}

export { CreateUserController }