import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Webflix - Home',
    description: 'Just a little generic movie/tv show app.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={GeistSans.className}>
                <header className="header--main">
                    <h2><Link href="/">Webflix</Link></h2>
                    <nav>
                        <Link href="/">Trending</Link>
                        <Link href="/">Popular</Link>
                        <Link href="/">Now Playing</Link>
                        <Link href="/">Upcoming</Link>
                        <Link href="/">Search</Link>
                    </nav>
                </header>
                <main>
                    {children}
                    <Analytics />
                </main>
            </body>
        </html>
    )
}
