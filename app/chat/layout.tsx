"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import History from "./history"

const queryClient = new QueryClient()

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
  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed w-full h-screen flex flex-row items-stretch">
        <div className="hidden md:flex md:w-80 bg-base-200 flex-col items-stretch">
          <div className="overflow-auto flex flex-col p-2">
            <NewButton />
            <History />
          </div>
        </div>
        <div className="flex-1 relative h-full">
          <div className="fixed navbar bg-base-100 z-10">
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
              <Link href="/" className="btn btn-ghost normal-case text-xl">
                Home
              </Link>
            </div>
          </div>
          <div className="pt-12 h-full">{children}</div>
        </div>
      </div>
    </QueryClientProvider>
  )
}
