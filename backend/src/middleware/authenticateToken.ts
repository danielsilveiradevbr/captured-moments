import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;
    let token = ''
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
        
    }

    if(!token) return reply.status(400).send({message: "Token não encontrado"})
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
            userId: string
        }

        request.user = decoded
        return true
    } catch (error) {
        return reply.status(401).send({message: "Token inválido"})
    
    }

    
}