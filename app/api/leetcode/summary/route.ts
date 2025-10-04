import { accounts } from "@/lib/accounts"

export async function GET() {
  try {
    const username = accounts.leetcode
    if (!username || username === "YOUR_LEETCODE_USERNAME") {
      return Response.json({ error: "LeetCode username not configured" }, { status: 400 })
    }

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/",
        Origin: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `
          query userOverview($username: String!) {
            matchedUser(username: $username) {
              username
              profile { ranking reputation realName userAvatar }
              submitStats: submitStatsGlobal {
                acSubmissionNum { difficulty count submissions }
              }
            }
            recentAcSubmissionList(username: $username, limit: 5) {
              id
              title
              titleSlug
              timestamp
            }
          }
        `,
        variables: { username },
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      return Response.json({ error: "Failed to fetch LeetCode data", detail }, { status: res.status })
    }

    const json = await res.json()
    if (json?.errors?.length) {
      return Response.json({ error: "LeetCode GraphQL error", detail: json.errors }, { status: 400 })
    }

    const user = json?.data?.matchedUser
    if (!user) return Response.json({ error: "LeetCode user not found" }, { status: 404 })

    const ac = user.submitStats?.acSubmissionNum ?? []
    const get = (d: string) => ac.find((x: any) => x.difficulty === d)?.count ?? 0

    const recent = (json?.data?.recentAcSubmissionList ?? []).map((s: any) => ({
      id: String(s.id ?? `${s.titleSlug}-${s.timestamp}`),
      title: s.title,
      titleSlug: s.titleSlug,
      status: "AC",
      lang: undefined,
      timestamp: s.timestamp,
    }))

    return Response.json({
      user: {
        username: user.username,
        realName: user.profile?.realName,
        avatar: user.profile?.userAvatar,
        ranking: user.profile?.ranking,
        reputation: user.profile?.reputation,
      },
      solved: { total: get("All"), easy: get("Easy"), medium: get("Medium"), hard: get("Hard") },
      recent,
    })
  } catch (err: any) {
    return Response.json({ error: err?.message ?? "Unknown error" }, { status: 500 })
  }
}
