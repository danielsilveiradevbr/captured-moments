declare module 'RegisteredMomentsProps' {
    interface RegisteredMomentsProps {
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