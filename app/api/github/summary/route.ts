import { accounts } from "@/lib/accounts"

export async function GET() {
  try {
    const username = accounts.github
    if (!username || username === "YOUR_GITHUB_USERNAME") {
      return Response.json({ error: "GitHub username not configured" }, { status: 400 })
    }

    const headers: HeadersInit = {
      "User-Agent": "v0-portfolio",
      Accept: "application/vnd.github+json",
    }

    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers, cache: "no-store" })
    if (!userRes.ok) {
      const detail = await userRes.text()
      return Response.json({ error: "Failed to fetch GitHub user", detail }, { status: userRes.status })
    }
    const user = await userRes.json()

    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers,
      cache: "no-store",
    })
    const events = eventsRes.ok ? await eventsRes.json() : []

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=1`, {
      headers,
      cache: "no-store",
    })
    const repos = reposRes.ok ? await reposRes.json() : []
    const latestRepo = repos?.[0] ?? null

    return Response.json({
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      latestRepo: latestRepo
        ? {
            name: latestRepo.name,
            html_url: latestRepo.html_url,
            pushed_at: latestRepo.pushed_at,
            stargazers_count: latestRepo.stargazers_count,
          }
        : null,
      latestEvent: events?.[0]
        ? {
            type: events[0].type,
            repo: events[0].repo?.name,
            created_at: events[0].created_at,
          }
        : null,
    })
  } catch (err: any) {
    return Response.json({ error: err?.message ?? "Unknown error" }, { status: 500 })
  }
}
