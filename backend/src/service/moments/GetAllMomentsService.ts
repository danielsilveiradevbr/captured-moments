import { UserProps } from 'UserProps'
import prismaClient from '../../prisma'

class GetAllMomentsService {
    async execute({user}: Omit<UserProps, 'fullName' | 'email' | 'password'>) {
        const moments = await prismaClient.registeredMoment.findMany({
            where: {
                userId: user?.userId
            },
            orderBy: {
                isFavorite: 'desc'
            }
        })

        if (!moments) {
            throw new Error('Nenhum moments encontrado!')
        }

        return {
            message: 'Moments encontrado!',
            moments: moments	         
        }
    }
}

export { GetAllMomentsService }