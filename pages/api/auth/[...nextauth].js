import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../models/User';
import db from "../../../utils/db";
import bcryptjs from 'bcryptjs';

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user?._id) token._id = user._id
            return token
        },
        async session({ session, token }) {
            if(token?._id) session.user._id = token._id
            return session
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect()
                const user = await User.findOne({
                    email: credentials.email
                })
                await db.disconnect()
                if(user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                }
                throw new Error('Invalid email or password')
            }
        })
    ]
})