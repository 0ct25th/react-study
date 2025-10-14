import { Metadata } from "next"
import Navigation from "../components/navigation"

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movies",
    default: "NEXT",
  },
  description: 'The best movies on the best framework',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
