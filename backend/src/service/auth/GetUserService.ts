import { UserProps } from 'UserProps'
import prismaClient from '../../prisma'

class GetUserService {
    async execute({user}: Omit<UserProps, 'fullName' | 'email' | 'password'>) {
        const isUser = await prismaClient.user.findFirst({
            where: {
                id: user.userId
            }
        })

        if (!isUser) {
            throw new Error('Usuário não encontrado!')
        }

        return {
            message: 'Usuário encontrado!',
            user: isUser	         
        }
    }
}

export { GetUserService }