import nextAuth, { User } from "next-auth";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";
const jwtt = require('jsonwebtoken')

interface CustomUser extends User {
  token:string,
  role: string;
}
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials:any) { // ลบ req ออกจาก parameter list
              try {
                const { email, password } = credentials;
                console.log(email+" "+password);
                const user = await userLogin(email, password);
                if (user) {
                    console.log("entry to return user");
                    return user;
                } else {
                    return null;
                }
              } catch (error) {
                console.log("error is "+error);
              }
            }
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
      async jwt({ token, user }) {
        if (user && (user as CustomUser).token) {
            const payload = jwtt.decode((user as CustomUser).token);
            token.user = payload;
        }
        return token;
    },
    
    async session({ session, token, user }) {
        if (token && token.user && session) {
            session.user = token.user as any;

        }
        return session;
    }
    },
    pages: {
        signIn: '/login'
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
