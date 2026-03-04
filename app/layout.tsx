import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Link from 'next/link'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LINKED OUT - Job Portal',
  description: 'Find your perfect job on LINKED OUT',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="nav-logo">LINKED OUT</Link>
            <ul className="nav-menu">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/jobs">Browse Jobs</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </div>
        </nav>
        
        {children}
        
        <footer className="footer">
          <p>&copy; 2024 LINKED OUT. All rights reserved.</p>
        </footer>
        
        <Analytics />
      </body>
    </html>
  )
}
