import '@/app/ui/global.css';
import { inter } from "@/app/ui/fonts"
import { Metadata } from "next"

// 共通のメタデータ
export const metadata: Metadata = {
    title: {
        // %s は特定のページのタイトルに置き換えられます。
        template: '%s | Acme Dashboard',
        default: 'Acme Dashboard',
    },
    description: 'The official Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }) {
    return (
        <html lang="ja">
        <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}

