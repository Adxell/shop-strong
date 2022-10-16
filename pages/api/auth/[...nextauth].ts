import NextAuth, { NextAuthOptions, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials';
import { dbUser } from "../../../database"
interface extendUser extends User {
    id: string;
    email: string;
    role: string;
    name: string;
}
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Correo', type: 'email', placoholder: 'example@mail.com'},
        password: { label: 'Password', type: 'password', placeholder: 'password'}
      },
      async authorize(credentials): Promise<extendUser|null>  {
        try{
          const  user =  await dbUser.checkEmailPassword(credentials?.email!, credentials?.password!)
          if( !user ){
            return null
          }
          return user
        }catch(error){
          return null
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400
  },

  callbacks: {
    jwt: async ({ token, account, user  }) => {
      if (account) {
        token.accessToken = account.access_token;
        switch ( account.type ) {
          case 'oauth':
            token.user = await dbUser.oAuthToDbUser(user?.email!, user?.name!)
            break;
          case 'credentials':
            token.user= user
            break;
        }
      }
      return token;
    },

    session: async ({ session , token , user}) => {
      (session as any).accessToken = token.accessToken;
      session.user = token.user as any
      return session;
    }
  }
}

export default NextAuth(authOptions)