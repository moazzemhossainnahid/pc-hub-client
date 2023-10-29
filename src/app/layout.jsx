"use client";


import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/context/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import '@/i18n';
import "/node_modules/flag-icons/css/flag-icons.min.css";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "PC-HUB",
  description:"We Are all PC-HUB Family.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="https://i.ibb.co/09CVzCd/PC-Hub-favicon.png" />
      </head>
      <body className={inter.className}>
        <Suspense>
          <Provider store={store}>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </Provider>
        </Suspense>
      </body>
    </html>
  )
}
