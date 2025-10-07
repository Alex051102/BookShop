import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/database/auth';
import { Rubik } from 'next/font/google'
import Header from "@/components/Ui/header/Header";
import SessionProvider from './SessionProvider';
import { FavoritesProvider } from '@/app/contexts/FavoritesContext';
const rubik = Rubik({
  subsets: ['latin', 'cyrillic'], 
  weight: ['300', '400', '500', '600', '700'], 
  display: 'swap', 
  variable: '--font-rubik', 
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ru" className={rubik.variable}>
      <SessionProvider session={session}>
      <body className={rubik.className}>
        <Header></Header>
         <FavoritesProvider> 
        {children}
         </FavoritesProvider>
      </body></SessionProvider>
    </html>
  )
}