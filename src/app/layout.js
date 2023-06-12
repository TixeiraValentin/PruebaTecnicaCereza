'use client'

import './globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Andada_Pro} from 'next/font/google'
import NavBar from './Components/NavBar/NavBar'

export const metadata = {
  title: 'Técnico Cereza',
  description: 'Examen técnico para Cereza',
}

const andada = Andada_Pro({
  display: 'swap',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  
  const queryClient = new QueryClient()
  
  return (
    <html lang="en" className={andada.className}>
      <QueryClientProvider client={queryClient}>
      <body>
        <NavBar/>
        {children}
      </body>
      </QueryClientProvider>
    </html>
  )
}
