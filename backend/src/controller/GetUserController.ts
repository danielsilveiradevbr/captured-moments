import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserService } from "../service/GetUserService"

class GetUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {user} = request

        if (!user) {
            return reply.status(400).send({error:true, message: 'Usuário não encontrado!'})
        }
        try {
          const getUserService = new GetUserService()
          const usuario = await getUserService.execute({user})

          return reply.status(200).send(usuario)
        } catch (error: any) {
            return reply.status(400).send({erro:true, message: error.message})
        }

    }
}

export { GetUserController }