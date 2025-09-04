import { RegisteredMomentsProps } from "RegisteredMomentsProps";
import { FastifyReply, FastifyRequest } from "fastify";
import { EditRegisteredMomentsService } from "../../service/moments/EditRegisteredMomentsService";

class EditRegisteredMomentsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {id} = request.params as {id: string}
        const {
            title,
            story,
            visitedLocation,
            imageUrl,
            visitedDate
        } = request.body as RegisteredMomentsProps
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

        try {
          const editRegisteredMomentsService = new EditRegisteredMomentsService()
          const moment = await editRegisteredMomentsService.execute({
            id,
            title,
            story,
            visitedLocation,
            imageUrl,
            visitedDate,
            user
          })
          return reply.status(201).send({moment})
        } catch (error: any) {
            return reply.status(400).send({erro:true, message: error.message})
        }

    }

}

export { EditRegisteredMomentsController }