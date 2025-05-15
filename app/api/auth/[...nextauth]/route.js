import ConnectToDatabase from "@/lib/connect"
import User from "@/models/user-model"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions = { 
  providers:[
    Credentials({
        async authorize(credentials){
           const {email,password}=credentials
            await ConnectToDatabase()
            const userExists=await User.findOne({email})
            console.log('1')
           if(!userExists){
            return null
           }
           let isMatch=await userExists.verifyPassword(password);
           
           if(!isMatch){
            console.log('notmatched')
            return null
           }
           return {
            id:userExists._id,
            name:userExists.name,
            email:userExists.email,
            seller:userExists.seller
           }
        }
    })
  ],
  session:{
    strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET,
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id=user.id
            token.isSeller=user.seller
        }
       return token
    },
    async session({session,token}){
        session.user.id=token.id
        session.user.isSeller=token.isSeller
        return session
    }
  }
}
const handler=NextAuth(authOptions)

export {handler as POST ,handler as GET}