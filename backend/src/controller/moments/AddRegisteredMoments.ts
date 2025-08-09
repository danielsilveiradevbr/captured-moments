import { RegisteredMomentsProps } from "RegisteredMomentsProps";
import { FastifyReply, FastifyRequest } from "fastify";
import { AddRegisteredMomentsService } from "../../service/moments/AddRegisteredMomentsService";

class AddRegisteredMomentsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
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
          const addRegisteredMomentsService = new AddRegisteredMomentsService()
          const moment = await addRegisteredMomentsService.execute({
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

export { AddRegisteredMomentsController }