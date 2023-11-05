"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { useSupabase } from "@/components/SupabaseProvider"

function HistoryItem(props: { item: any }) {
  const { item } = props
  const { id, messages, created_at } = item as {
    id: string
    messages: { content: string }[]
    created_at: number
  }

  const date = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null

  return (
    <li key={id}>
      <Link
        href={`/chat?id=${id}`}
        className="flex flex-col items-start bg-base-100 shadow"
      >
        <div className="text-sm line-clamp-3">
          {messages[item.messages.length - 1].content}
        </div>
        <div className="text-xs text-base-content/[.5] mb-1">{date}</div>
      </Link>
    </li>
  )
}

export default function History() {
  const supabase = useSupabase()

  const { data: history, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const { data } = await supabase
        .from("chat_completions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)
      return data
    },
  })

  return (
    <div>
      {isLoading ? (
        <div className="p-4 flex flex-row justify-center">
          <span className="loading loading-spinner" />
        </div>
      ) : (
        <ul className="menu gap-2">
          {history
            ? history.map((item) => <HistoryItem key={item.id} item={item} />)
            : null}
        </ul>
      )}
    </div>
  )
}
