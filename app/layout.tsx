import type React from "react"
import type { Metadata } from "next"
import { Outfit, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Daniel Di Grandi | Desenvolvedor Full Stack",
  description:
    "Portfólio profissional de Daniel Di Grandi, desenvolvedor Full Stack especializado em automação, inteligência artificial e desenvolvimento web.",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '32x32' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${outfit.variable} ${poppins.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'