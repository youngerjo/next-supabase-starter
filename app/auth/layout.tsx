import { ReactNode } from "react"

export default function Layout(props: { children: ReactNode }) {
  const { children } = props

  return <div className="h-screen bg-base-200">{children}</div>
}
