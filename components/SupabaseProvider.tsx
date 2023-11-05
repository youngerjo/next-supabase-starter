"use client"

import { ReactNode, createContext, useContext } from "react"
import { createBrowserClient } from "@supabase/ssr"

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SupabaseContext = createContext(supabase)

export const useSupabase = () => {
  return useContext(SupabaseContext)
}

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}
