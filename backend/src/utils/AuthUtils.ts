import jwt from 'jsonwebtoken'

export class AuthUtils {

    static generatedAccessToken(userId: string): string{
        if (process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET não definido!')
        }
        return jwt.sign(
            {userId},
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: '72h'}
          )
    }
}