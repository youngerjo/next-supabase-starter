"use client"

import { useSupabase } from "@/components/SupabaseProvider"
import { Auth } from "@supabase/auth-ui-react"

export default function Page() {
  const supabase = useSupabase()

  return (
    <div className="h-full container mx-auto flex flex-col items-center justify-center p-2">
      <div className="min-w-96 px-6 pt-6 pb-10 bg-base-100 rounded-xl shadow-xl">
        <Auth
          supabaseClient={supabase}
          redirectTo="/"
          providers={["apple", "discord", "google", "slack"]}
          socialLayout="vertical"
          appearance={{
            extend: false,
            className: {
              container: "flex flex-col items-stretch",
              button: "btn btn-outline mb-1",
              divider: "divider my-2",
              label: "label-text",
              input: "input w-full bg-base-200 mb-2",
              anchor:
                "flex flex-col text-center text-sm mt-2 text-base-content/[.75]",
              message:
                "absolute left-0 right-0 text-sm text-center text-error pt-2",
              loader: "loading loading-spinner",
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email address",
                email_input_placeholder: "you@example.com",
                password_label: "Password",
                password_input_placeholder: "********",
              },
              sign_up: {
                email_label: "Email address",
                email_input_placeholder: "you@example.com",
                password_label: "Password",
                password_input_placeholder: "********",
              },
              forgotten_password: {
                email_label: "Email address",
                email_input_placeholder: "you@example.com",
                button_label: "Reset Password",
              },
            },
          }}
        />
      </div>
    </div>
  )
}
