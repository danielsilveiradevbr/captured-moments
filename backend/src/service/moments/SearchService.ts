import { UserProps } from 'UserProps'
import prismaClient from '../../prisma'
import { SearchProps } from 'SearchProps'

class SearchService {
    async execute({user}: Omit<UserProps, 'fullName' | 'email' | 'password'>, {query}: SearchProps) {
        
        const moments = await prismaClient.registeredMoment.findMany({
            where: {
              userId: user?.userId,
              OR: [
                {
                  title: {
                    contains: query,
                    mode: 'insensitive'
                  }
                },
                {
                  story: {
                    contains: query,
                    mode: 'insensitive'
                  }
                },
                {
                  visitedLocation: {
                    hasSome: [query]
                  }
                }
              ] 
            },
            orderBy: {
              isFavorite: 'desc'
            }
            
          })
        
                  
        return {
            message: 'Moments encontrado!',
            moments: moments	         
        }
    }
}

export { SearchService }