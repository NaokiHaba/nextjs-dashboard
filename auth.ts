import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from "zod"
import { User } from "@/app/lib/definitions"
import { sql } from "@vercel/postgres"
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[ 0 ];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    // クレデンシャル（ユーザー名とパスワード）による認証プロバイダーを追加
    providers: [ Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object({
                email: z.string().email(),
                password: z.string().min(6)
            }).safeParse(credentials) // 提供されたデータがスキーマに適合するかチェックし、その結果を含むオブジェクトを返す

            if (parsedCredentials.success) {
                const {email, password} = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                const passwordMatches = await bcrypt.compare(password, user.password);
                if(passwordMatches){
                    return user;
                }
            }
            console.log('Failed to authorize user:', credentials)
            return null
        }
    })
    ]
});