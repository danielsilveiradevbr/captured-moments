import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserService } from "../../service/auth/GetUserService"
import { GetAllMomentsService } from "../../service/moments/GetAllMomentsService"

class GetAllMomentsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {user} = request

        if (!user) {
            return reply.status(400).send({error:true, message: 'Usuário não encontrado!'})
        }
        try {
          const getAllMomentsService = new GetAllMomentsService()

          const moments = await getAllMomentsService.execute({user})

          return reply.status(200).send(moments)
        } catch (error: any) {
            return reply.status(400).send({erro:true, message: error.message})
        }

    }
}

export { GetAllMomentsController }