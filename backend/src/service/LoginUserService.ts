import prismaClient from "../prisma"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

        const accessToken = jwt.sign(
            {userId: isUser.id},
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: '72h'}
        )

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