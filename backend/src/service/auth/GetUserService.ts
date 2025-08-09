import prismaClient from '../../prisma'

interface UserProps {
    user: {
        userId: string
    }
}


class GetUserService {
    async execute({user}: UserProps) {
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