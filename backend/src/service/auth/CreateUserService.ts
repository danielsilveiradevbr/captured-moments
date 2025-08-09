import prismaClient from '../../prisma'
import bcrypt from 'bcrypt'
import { AuthUtils } from '../../utils/AuthUtils'
import { UserProps } from 'UserProps'

class CreateUserService {
    async execute({fullName, email, password}: UserProps) {
        const isUser = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (isUser) {
           throw new Error('Usuário já existe!')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prismaClient.user.create({
            data: {
                fullName: fullName,
                email: email,
                password: hashedPassword
            }
        })

        const accessToken = AuthUtils.generatedAccessToken(user.id)


        return {
            error: false,
            message: 'Registrado com sucesso!',
            accessToken: accessToken,
            user: {
                fullName: user.fullName,
                email: user.email,
                id: user.id
            }
        }
                 
    }
}

export { CreateUserService }