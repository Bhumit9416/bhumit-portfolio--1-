import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }

    console.log("[v0] Contact form submission:", { name, email, message })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 })
  }
}
