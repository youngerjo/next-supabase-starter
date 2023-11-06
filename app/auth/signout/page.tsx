"use client"

import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/SupabaseProvider"
import { useEffect } from "react"

export default function Page() {
  const supabase = useSupabase()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.signOut()
    router.replace("/")
  }, [])

  return null
}
