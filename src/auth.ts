import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import authApiRequest from "./apiRequest/auth"
import { InactiveAccountError, InvalidEmailPasswordError } from "./lib/error"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {          
        if (!credentials.username || !credentials.password) throw new Error('Not receive username or password!')
        const username = credentials.username as string
        const password = credentials.password as string

        const res = await authApiRequest.login({ username, password })

        if (res.statusCode === 200) {
          return {
            _id: res.data?.user._id,
            name: res.data?.user.username,
            email: res.data?.user.email,
            access_token: res.data?.accessToken
          }
        }

        if (+res.statusCode === 401)
          throw new InvalidEmailPasswordError()
        if (+res.statusCode === 400)
          throw new InactiveAccountError()

        throw new Error("Internal server error")
      },
    }),
  ],
})