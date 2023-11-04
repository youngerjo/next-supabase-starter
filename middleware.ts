// Implementation from the official docs:
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs?language=ts#managing-session-with-middleware

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}
