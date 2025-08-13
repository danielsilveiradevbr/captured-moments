import { FastifyReply, FastifyRequest } from "fastify"
import { SearchService } from "../../service/moments/SearchService"

class SearchController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {query} = request.query as {query: string}
        const {user} = request

        if (!query) {
          return reply.status(400).send({error: true, messge: 'Paramtros não encontrados'})
        }
        try {
          const searchService = new SearchService()
          const moments = await searchService.execute({user}, {query})

          return reply.status(200).send(moments)
        } catch (error: any) {
            return reply.status(400).send({erro:true, message: error.message})
        }

    }
}

export { SearchController }