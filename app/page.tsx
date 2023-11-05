import Link from "next/link"
import HelloWorld from "@/components/HelloWorld"

import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    }
  )

  const { data: sessionData } = await supabase.auth.getSession()

  return (
    <div className="container mx-auto p-4">
      <HelloWorld />
      <div className="divider" />
      <div className="flex flex-row items-center gap-2">
        <Link className="btn btn-outline" href="/chat" tabIndex={0}>
          Start Chat
        </Link>
        {sessionData?.session ? (
          <Link className="btn btn-ghost" href="/auth/signout" tabIndex={1}>
            Sign Out
          </Link>
        ) : (
          <Link className="btn btn-ghost" href="/auth/signin" tabIndex={1}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}
