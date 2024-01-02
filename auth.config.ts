import type { NextAuthConfig } from 'next-auth';

// https://authjs.dev/guides/upgrade-to-v5
export const authConfig = {
    // 認証操作を行うためのページをカスタマイズするためのパス
    pages: {
        // カスタムログインページのパス
        signIn: '/login'
    },

    callbacks: {
        // ユーザがログインしており、ダッシュボードにアクセスしようとしている場合、 true を返しアクセスを許可
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    },
    providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;