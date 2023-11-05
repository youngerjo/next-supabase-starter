"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useChat } from "ai/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSupabase } from "@/components/SupabaseProvider"

export default function Page() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const router = useRouter()
  const queryClient = useQueryClient()
  const supabase = useSupabase()

  const { data } = useQuery({
    queryKey: ["history", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("chat_completions")
        .select("*")
        .eq("id", id)
        .single()
      return data
    },
    enabled: !!id,
  })

  const chat = useChat({ api: "/chat/api", body: { id } })

  useEffect(() => {
    if (data) {
      chat.setMessages(data.messages)
    } else {
      chat.setMessages([])
    }
  }, [data])

  const textField = useRef<HTMLInputElement>(null)
  const messageEnd = useRef<HTMLLIElement>(null)

  const [inputText, setInputText] = useState("")

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()

    await chat.append({
      role: "user",
      content: inputText,
    })

    setInputText("")

    queryClient.invalidateQueries({
      queryKey: ["history"],
    })

    if (!id) {
      const { data } = await supabase
        .from("chat_completions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      await router.replace(`/chat?id=${data.id}`)
    }
  }

  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView()
    }

    if (!chat.isLoading) {
      if (textField.current) {
        textField.current.focus()
      }
    }
  }, [chat.isLoading])

  return (
    <div className="flex flex-col justify-between items-stretch">
      <ul className="p-4 mb-16">
        {chat.messages
          .filter((message) => message.role != "system")
          .map((message, index) => (
            <li
              key={index}
              className={`chat ${
                message.role == "user" ? "chat-end" : "chat-start"
              }`}
            >
              {message.role == "assistant" && (
                <div className="chat-header">AI</div>
              )}
              <div
                className={`chat-bubble ${
                  message.role == "user"
                    ? "chat-bubble-accent"
                    : "chat-bubble-info"
                }`}
              >
                {message.content}
              </div>
            </li>
          ))}
        <li ref={messageEnd} />
      </ul>
      <form
        onSubmit={sendMessage}
        className="absolute w-full bottom-0 bg-base-100 shadow px-4 py-2"
      >
        <div className="flex flex-row justify-between items-center gap-2">
          <input
            ref={textField}
            className={`flex-1 input input-bordered ${
              chat.isLoading ? "input-disabled" : ""
            }`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={chat.isLoading}
          />
          <button
            type="submit"
            className="btn btn-neutral w-24"
            disabled={chat.isLoading}
          >
            {chat.isLoading ? (
              <div className="flex flex-row items-center gap-2">
                <span className="loading loading-spinner" />
                <span>Waiting</span>
              </div>
            ) : (
              <span>Send</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
