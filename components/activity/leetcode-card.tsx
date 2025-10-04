"use client"

import useSWR from "swr"
import { ExternalLink, ListChecks, Medal } from "lucide-react"
import { cn } from "@/lib/utils"
import { accounts } from "@/lib/accounts"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function LeetCodeCard({ className }: { className?: string }) {
  const { data, error, isLoading } = useSWR("/api/leetcode/summary", fetcher, { refreshInterval: 60_000 })
  const notConfigured = data?.error === "LeetCode username not configured"
  const profileUrl =
    accounts.leetcode && accounts.leetcode !== "YOUR_LEETCODE_USERNAME"
      ? `https://leetcode.com/${accounts.leetcode}/`
      : undefined

  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground p-4 md:p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">LeetCode</h3>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Profile <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {isLoading && <div className="mt-4 text-sm opacity-70">Loading practice stats…</div>}
      {error && <div className="mt-4 text-sm text-destructive">Failed to load LeetCode stats.</div>}
      {notConfigured && (
        <div className="mt-4 text-sm opacity-80">Set your LeetCode username in lib/accounts.ts to see live stats.</div>
      )}

      {!isLoading && !error && data?.user && !notConfigured && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span className="font-medium">Solved</span>
            </div>
            <div className="mt-1 text-2xl font-bold">{data.solved?.total ?? 0}</div>
            <div className="mt-1 opacity-80">
              E: {data.solved?.easy ?? 0} • M: {data.solved?.medium ?? 0} • H: {data.solved?.hard ?? 0}
            </div>
          </div>
          <div className="rounded-lg bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <Medal className="h-4 w-4" />
              <span className="font-medium">Ranking</span>
            </div>
            <div className="mt-1 text-2xl font-bold">{data.user?.ranking ?? "—"}</div>
          </div>
          <div className="rounded-lg bg-muted/30 p-3 col-span-2">
            <div className="font-medium">Recent Submissions</div>
            {data.recent?.length ? (
              <ul className="mt-2 grid gap-2">
                {data.recent.slice(0, 5).map((s: any) => (
                  <li key={s.id} className="flex items-center justify-between">
                    <a
                      href={`https://leetcode.com/problems/${s.titleSlug}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {s.title}
                    </a>
                    <span className="text-xs opacity-70">{s.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-1 opacity-70">No recent submissions.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
