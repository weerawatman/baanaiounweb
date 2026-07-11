import type { SuccessStory as SuccessStoryRow } from "@/lib/types/property"
import type { SuccessStory as SuccessStoryView } from "@/types"

function isNonEmptyImageUrl(url: string | null | undefined): boolean {
  const trimmed = url?.trim() ?? ""
  if (!trimmed) return false
  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

/** Admin row — must be published and have both image URLs. */
export function isDisplayableSuccessStoryRow(row: Pick<SuccessStoryRow, "published" | "before_image_url" | "after_image_url">): boolean {
  if (!row.published) return false
  return isNonEmptyImageUrl(row.before_image_url) && isNonEmptyImageUrl(row.after_image_url)
}

/** Public view model — images only (published already filtered upstream). */
export function isDisplayableSuccessStoryView(
  story: Pick<SuccessStoryView, "beforeImageUrl" | "afterImageUrl">,
): boolean {
  return isNonEmptyImageUrl(story.beforeImageUrl) && isNonEmptyImageUrl(story.afterImageUrl)
}

export function filterDisplayableSuccessStoryRows<T extends Pick<SuccessStoryRow, "published" | "before_image_url" | "after_image_url">>(
  rows: T[],
): T[] {
  return rows.filter(isDisplayableSuccessStoryRow)
}

export function filterDisplayableSuccessStoryViews(stories: SuccessStoryView[]): SuccessStoryView[] {
  return stories.filter(isDisplayableSuccessStoryView)
}
