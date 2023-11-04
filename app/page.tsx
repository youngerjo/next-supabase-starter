import Link from "next/link"
import HelloWorld from "@/components/HelloWorld"

export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <HelloWorld />
      <div className="divider" />
      <Link className="btn btn-primary" href="/chat" tabIndex={0}>
        Start Chat
      </Link>
    </div>
  )
}
