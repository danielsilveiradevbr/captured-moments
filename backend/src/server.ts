import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import prismaClient from './prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const app = fastify({logger: true})

const start = async () => {

    app.get('/backend',async (request: FastifyRequest, replay: FastifyReply) => {
        replay.status(200).send({message: 'Olá backend rodando!'})
    })

    app.post('/create-account',async (request: FastifyRequest, replay: FastifyReply) => {
        const { fullName, email, password } = request.body as { fullName: string, email: string, password: string}
        
        if (!fullName || !email || !password) {
            replay.status(400).send({message: 'Todos os campos são obrigatórios!'})
        }    

        const isUser = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (isUser) {
            replay.status(400).send({error: true, message: 'Usuário já existe!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prismaClient.user.create({
            data: {
                fullName: fullName,
                email: email,
                password: hashedPassword
            }
        })

        const accessToken = jwt.sign(
          {userId: user.id},
          process.env.ACCESS_TOKEN_SECRET!,
          {expiresIn: '72h'}
        )

        replay.status(200).send({
            error: false,
            message: 'Usuário criado com sucesso!',
            accessToken: accessToken,
            user: {
                fullName: user.fullName,
                email: user.email,
                id: user.id
            }
        })
                                    
    })
    app.listen({ port: 8000}, () => {
        console.log('O servidor está rodando na porta 8000!')
    })
}

start()
