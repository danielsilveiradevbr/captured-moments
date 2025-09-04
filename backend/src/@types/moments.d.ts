declare module 'RegisteredMomentsProps' {
    interface RegisteredMomentsProps {
        id: string
        title: string
        story: string
        visitedLocation: string[]
        imageUrl: string
        visitedDate: string
        user: {
            userId: string
        }
    
    }
}