"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useChat } from "ai/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
})

export default function Page() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const queryClient = useQueryClient()
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

    queryClient.invalidateQueries({
      queryKey: ["history"],
    })
    setInputText("")
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
    <div className="h-full flex flex-col justify-between items-stretch">
      <ul className="overflow-auto p-4">
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
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
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
        className="flex flex-row justify-between items-center gap-2 px-4 py-2"
      >
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
          className="btn btn-primary w-32"
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
      </form>
    </div>
  )
}
