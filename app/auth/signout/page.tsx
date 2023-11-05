"use client"

import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/SupabaseProvider"

export default async function Page() {
  const supabase = useSupabase()
  const router = useRouter()

  await supabase.auth.signOut()
  await router.replace("/")

  return null
}
