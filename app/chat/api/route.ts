import { type NextRequest } from "next/server"
import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = "edge"

export async function POST(req: NextRequest) {
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

  const user_id = (await supabase.auth.getSession()).data?.session?.user.id
  const json = await req.json()

  const {
    id,
    model = "gpt-3.5-turbo",
    max_tokens = 256,
    temperature = 1,
    frequency_penalty = 0,
    presence_penalty = 0,
    messages,
  } = json as OpenAI.ChatCompletionCreateParams & { id?: string }

  const params = {
    model,
    max_tokens,
    temperature,
    frequency_penalty,
    presence_penalty,
  }

  const response = await openai.chat.completions.create({
    ...params,
    messages,
    user: user_id,
    stream: true,
  })

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      const queryBuilder = supabase.from("chat_completions")

      let data = {
        ...params,
        messages: [
          ...messages,
          {
            role: "assistant",
            content: completion,
          },
        ],
        user_id,
      }

      if (id) {
        await queryBuilder.upsert({ ...data, id })
      } else {
        await queryBuilder.insert({ ...data })
      }
    },
  })

  return new StreamingTextResponse(stream)
}
