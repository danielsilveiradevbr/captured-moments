import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserService } from "../service/LoginUserService";

class LoginUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string, password: string}
        
        if (!email || !password) {
            reply.status(400).send({message: 'Todos os campos são obrigatórios!'})
        }

        try {
          const loginUserService = new LoginUserService()
          const user = await loginUserService.execute({email, password})
          reply.status(200).send({user})
        } catch (error: any) {
            reply.status(400).send({erro:true, message: error.message})
        }

    }
}

export {LoginUserController}