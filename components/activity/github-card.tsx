"use client"

import useSWR from "swr"
import { ExternalLink, GitFork, GitCommit, Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function GithubCard({ className }: { className?: string }) {
  const { data, error, isLoading } = useSWR("/api/github/summary", fetcher, { refreshInterval: 60_000 })
  const notConfigured = data?.error === "GitHub username not configured"

  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground p-4 md:p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">GitHub</h3>
        {data?.user?.html_url && (
          <a
            href={data.user.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Profile <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {isLoading && <div className="mt-4 text-sm opacity-70">Loading latest activity…</div>}
      {error && <div className="mt-4 text-sm text-destructive">Failed to load GitHub activity.</div>}
      {notConfigured && (
        <div className="mt-4 text-sm opacity-80">Set your GitHub username in lib/accounts.ts to see live stats.</div>
      )}

      {!isLoading && !error && data?.user && !notConfigured && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="font-medium">Followers</span>
            </div>
            <div className="mt-1 text-2xl font-bold">{data.user.followers ?? 0}</div>
          </div>
          <div className="rounded-lg bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4" />
              <span className="font-medium">Public Repos</span>
            </div>
            <div className="mt-1 text-2xl font-bold">{data.user.public_repos ?? 0}</div>
          </div>
          <div className="rounded-lg bg-muted/30 p-3 col-span-2">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4" />
              <span className="font-medium">Latest Activity</span>
            </div>
            {data.latestEvent ? (
              <div className="mt-1">
                <span className="opacity-80">{data.latestEvent.type}</span> <span className="opacity-70">on</span>{" "}
                <span className="font-medium">{data.latestEvent.repo}</span>
              </div>
            ) : (
              <div className="mt-1 opacity-70">No recent public events.</div>
            )}
          </div>
          <div className="rounded-lg bg-muted/30 p-3 col-span-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="font-medium">Latest Repo</span>
            </div>
            {data.latestRepo ? (
              <a
                href={data.latestRepo.html_url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
              >
                {data.latestRepo.name} <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <div className="mt-1 opacity-70">No repos found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
