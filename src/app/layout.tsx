import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat Flow',
  description: 'BiteSpeed ChatFlow Demo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ToastContainer
          autoClose={8000}
          pauseOnFocusLoss={false}
          containerId='toastContainer'
          draggable={false}
        />
        {children}
      </body>
    </html>
  )
}
