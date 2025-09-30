
import { Rubik } from 'next/font/google'
import Header from "@/components/Ui/header/Header";

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'], 
  weight: ['300', '400', '500', '600', '700'], 
  display: 'swap', 
  variable: '--font-rubik', 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={rubik.variable}>
      <body className={rubik.className}>
        <Header></Header>
        {children}
      </body>
    </html>
  )
}