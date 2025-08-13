import { RegisteredMomentsProps } from "RegisteredMomentsProps"
import prismaClient from "../../prisma"

class AddRegisteredMomentsService {
    async execute({title, story, visitedLocation, imageUrl, visitedDate, user}: RegisteredMomentsProps) {
          const parsevisitedDate = new Date(parseInt(visitedDate))
    
    
    
          const Moment = await prismaClient.registeredMoment.create({
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

export { AddRegisteredMomentsService }