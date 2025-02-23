// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Bricolage_Grotesque } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const fontHeading = Bricolage_Grotesque({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
})

const fontBody = Space_Mono({
    subsets: ['latin'],
    weight: "400",
    display: 'swap',
    variable: '--font-body',
})

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Eclipse',
    description: 'Eclipse of the Desolate Abyss\n' +
        '\n' +
        'Whispers from the Forgotten Realm',
}

export default function Layout({ children }) {
    return (
        <html lang="en">
        <body
            className={cn(
                'antialiased',
                fontHeading.variable,
                fontBody.variable
            )}
        >
        {children}
        </body>
        </html>
    )
}