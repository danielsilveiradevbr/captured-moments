declare module 'UserProps' {
    interface UserProps {
        fullName: string
        email: string
        password: string  
        user: {
            userId: string
        } | undefined     
    }
}

