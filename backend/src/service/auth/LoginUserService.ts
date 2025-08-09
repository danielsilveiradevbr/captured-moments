import prismaClient from "../../prisma"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthUtils } from "../../utils/AuthUtils"

interface UserProps {
    email: string
    password: string
}


class LoginUserService {
    async execute({email, password}: UserProps) {
        const isUser = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!isUser) {
           throw new Error('Credenciais inválidas!')
        }

        const isPasswordValid = await bcrypt.compare(password, isUser.password)

        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas!')
        }

        const accessToken = AuthUtils.generatedAccessToken(isUser.id)

        return {
            erro: false,
            message: 'Logado com sucesso!',
            accessToken: accessToken,
            user:{
                fullName: isUser.fullName,
                email: isUser.email,
                id: isUser.id
            }
        }
    }
}

export { LoginUserService }