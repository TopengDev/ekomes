import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Layout } from "./FE/components/Layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "EKOMES",
   description: "MAMBA PROJECT",
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <Layout>{children}</Layout>
         </body>
      </html>
   )
}
