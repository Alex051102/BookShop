// app/layout.tsx
import { Rubik } from 'next/font/google'

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'], // поддерживает кириллицу
  weight: ['300', '400', '500', '600', '700'], // выбирай нужные начертания
  display: 'swap', // для производительности
  variable: '--font-rubik', // опционально, для CSS переменных
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={rubik.variable}>
      <body className={rubik.className}>
        {children}
      </body>
    </html>
  )
}