import { UserPropsLogin } from 'UserPropsLogin'
import prismaClient from '../../prisma'

class GetUserService {
    async execute({user}: UserPropsLogin) {
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