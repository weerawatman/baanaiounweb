/**
 * Shared tab constants for the /request page — plain module (no "use client")
 * so both the server page and client components can import it.
 */

export const REQUEST_TABS = ["list-property", "matchmaking", "co-agent"] as const
export type RequestTab = (typeof REQUEST_TABS)[number]

export function isRequestTab(value: string | undefined): value is RequestTab {
  return !!value && (REQUEST_TABS as readonly string[]).includes(value)
}
