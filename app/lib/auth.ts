import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()

export const NEXT_AUTH = {
    providers : [
        CredentialsProvider({
            name : "Email",
            credentials : {
                username : { label : "username", type : "text", placeholder : "username" },
                password : { label : "password", type : "password", placeholder : "password" },
            },
            async authorize(credentials : any) : Promise<any> {
                const { username,password } = credentials
                try {
                    const user = await client.user.findFirst({
                        where : {
                            username,
                            password
                        },
                        select : {
                            id : true
                        }
                    })
                    if(!user) return null
                    return {
                        id : user.id,
                        name : username,
                        email : `${username}@gmail.com`
                    }
                } catch (error) {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
        
    ],
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
        jwt : ({ token } : any) => {
            console.log(token);
            return token
        },
        session : ({ session,token } : any) => {
            session.user.id = token.sub
            return session
        }
    }
}