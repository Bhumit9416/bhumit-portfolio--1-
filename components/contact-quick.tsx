import { Mail, Phone, ExternalLink } from "lucide-react"
import { accounts, contact } from "@/lib/accounts"
import { cn } from "@/lib/utils"

export function ContactQuick({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground p-4 md:p-6", className)}>
      <h3 className="text-lg font-semibold">Contact</h3>
      <div className="mt-4 grid gap-3 text-sm">
        <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:underline">
          <Mail className="h-4 w-4" />
          <span>{contact.email}</span>
        </a>
        <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 hover:underline">
          <Phone className="h-4 w-4" />
          <span>{contact.phone}</span>
        </a>
        {accounts.linkedin && (
          <a
            href={accounts.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  )
}
