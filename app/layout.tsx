import { ReactNode } from "react"
import QueryClientProvider from "@/components/QueryClientProvider"
import SupabaseProvider from "@/components/SupabaseProvider"
import "./global.css"

export default function Layout(props: { children: ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <SupabaseProvider>{children}</SupabaseProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
