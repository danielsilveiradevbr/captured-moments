import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import prismaClient from './prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { routes } from './routes'



const app = fastify({logger: true})

const start = async () => {

    //Criacao de user
    app.register(routes);

    app.listen({ port: 8000}, () => {
        console.log('O servidor está rodando na porta 8000!')
    })
}

start()
