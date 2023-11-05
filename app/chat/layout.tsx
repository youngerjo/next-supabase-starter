"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useSupabase } from "@/components/SupabaseProvider"
import History from "./history"

function NewButton() {
  return (
    <Link
      href="/chat"
      className="btn btn-outline border-dashed btn-neutral m-2"
    >
      + New Chat
    </Link>
  )
}

function MenuButton() {
  return (
    <label htmlFor="chat-drawer" tabIndex={0} className="btn btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </label>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const queryClient = useQueryClient()
  const supabase = useSupabase()

  const deleteChat = useMutation({
    mutationFn: async () => {
      await supabase.from("chat_completions").delete().eq("id", id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["history"],
      })
      await router.push("/chat")
    },
  })

  return (
    <div className="fixed w-full h-screen flex flex-row items-stretch">
      <div className="hidden md:flex md:w-80 bg-base-200 flex-col items-stretch">
        <div className="overflow-auto flex flex-col p-2">
          <NewButton />
          <History />
        </div>
      </div>
      <div className="flex-1 relative flex flex-col">
        <div className="sticky flex flex-row items-center justify-between p-4 bg-base-100 z-10">
          <div>
            <div className="drawer">
              <input
                id="chat-drawer"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <div className="md:hidden">
                  <MenuButton />
                </div>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="chat-drawer"
                  className="drawer-overlay"
                  aria-label="Close Drawer"
                />
                <div className="relative w-80 min-h-full bg-base-200">
                  <div className="sticky top-0 p-2 bg-base-200 z-20">
                    <MenuButton />
                  </div>
                  <div className="flex flex-col p-2 overflow-auto">
                    <NewButton />
                    <History />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            {id && (
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => deleteChat.mutateAsync()}
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
