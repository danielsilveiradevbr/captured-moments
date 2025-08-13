declare module 'UserProps' {
    interface UserProps {
        fullName: string
        email: string
        password: string        
    }
}

declare module 'UserPropsLogin' {
    interface UserPropsLogin {
        user: {
            userId: string
        }
    }
}
