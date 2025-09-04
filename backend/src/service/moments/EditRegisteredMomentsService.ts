import { RegisteredMomentsProps } from "RegisteredMomentsProps"
import prismaClient from "../../prisma"

class EditRegisteredMomentsService {
    async execute({id, title, story, visitedLocation, imageUrl, visitedDate, user}: RegisteredMomentsProps) {
          
      const registeredMoment = await prismaClient.registeredMoment.findFirst({
        where: {
          id: id,
          userId: user.userId
        }
      })

      if (!registeredMoment) {
        throw new Error ('Moment não encontrado!')
      } 
      
      const parsevisitedDate = new Date(parseInt(visitedDate))   
    
          const Moment = await prismaClient.registeredMoment.update({
            where: {
              id: id,
              userId: user.userId
            },
            data: {
              title: title,
              story: story,
              visitedLocation: visitedLocation,
              imageUrl: imageUrl,
              visitedDate: parsevisitedDate,
              userId: user.userId
            }
          })
          
          return Moment
                         
    }
}

export { EditRegisteredMomentsService }