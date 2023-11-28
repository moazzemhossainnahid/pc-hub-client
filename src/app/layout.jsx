"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/context/AuthProvider'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import '@/i18n';
import "/node_modules/flag-icons/css/flag-icons.min.css";
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Provider store={store}>
          {/* <Suspense fallback="..loading translations"> */}
            <AuthProvider>
              <Toaster />
              {children}
            </AuthProvider>
          {/* </Suspense> */}
        </Provider>
      </body>
    </html>
  )
}
