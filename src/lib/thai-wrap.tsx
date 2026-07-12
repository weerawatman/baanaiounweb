import { Fragment, type ReactNode } from "react"

const THAI_CHAR = /[฀-๿]/
/** Strict pass: break only between two dictionary words this long. */
const STRICT_MIN_WORD = 5
/** Units longer than this get re-split with the relaxed rule. */
const MAX_UNIT = 28
/** Relaxed pass: minimum word length on both sides of a break. */
const RELAXED_MIN_WORD = 4
/** Relaxed pass: minimum accumulated unit length before breaking. */
const RELAXED_MIN_UNIT = 7
/** Units still longer than this render without a no-break span. */
const NOWRAP_MAX = 34

let segmenter: Intl.Segmenter | undefined
function getSegmenter(): Intl.Segmenter {
  segmenter ??= new Intl.Segmenter("th", { granularity: "word" })
  return segmenter
}

interface Token {
  segment: string
  isWordLike?: boolean
}

function mergeTokens(
  tokens: Token[],
  canBreak: (current: string, token: Token, next: Token) => boolean,
): string[] {
  const units: string[] = []
  let current = ""
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!
    current += token.segment
    const next = tokens[i + 1]
    if (next && canBreak(current, token, next)) {
      units.push(current)
      current = ""
    }
  }
  if (current) units.push(current)
  return units
}

/** Split a spaceless Thai run into phrase units that are safe to break between. */
function phraseUnits(run: string): string[] {
  const tokens = [...getSegmenter().segment(run)] as Token[]

  const strict = mergeTokens(
    tokens,
    (_current, token, next) =>
      Boolean(token.isWordLike && next.isWordLike) &&
      token.segment.length >= STRICT_MIN_WORD &&
      next.segment.length >= STRICT_MIN_WORD,
  )

  // Long units (common in spaceless Thai copy) would overflow narrow cards
  // as a single no-break run — re-split them with a relaxed rule.
  return strict.flatMap((unit) => {
    if (unit.length <= MAX_UNIT) return unit
    return mergeTokens(
      [...getSegmenter().segment(unit)] as Token[],
      (current, token, next) =>
        current.length >= RELAXED_MIN_UNIT &&
        Boolean(token.isWordLike && next.isWordLike) &&
        token.segment.length >= RELAXED_MIN_WORD &&
        next.segment.length >= RELAXED_MIN_WORD,
    )
  })
}

/**
 * Renders Thai text so lines wrap at phrase boundaries instead of the
 * browser's dictionary fragments (which split compounds like ผู้|ซื้อ or
 * เวิร์กชอป mid-word). Spaces remain normal break points; within a spaceless
 * run a break is only allowed between two full dictionary words (marked with
 * <wbr>), and each resulting phrase is wrapped in a no-break span. Phrases
 * that stay very long even after the relaxed pass are left unwrapped so the
 * browser can still break them rather than overflow. Non-string or non-Thai
 * content is returned untouched.
 *
 * Use from server components only — client usage would re-segment in the
 * browser and risk hydration mismatches across ICU versions.
 */
export function ThaiText({ text }: { text: ReactNode }): ReactNode {
  if (typeof text !== "string" || !THAI_CHAR.test(text)) return text
  return text.split(" ").map((run, runIndex) => (
    <Fragment key={runIndex}>
      {runIndex > 0 && " "}
      {phraseUnits(run).map((unit, unitIndex) => (
        <Fragment key={unitIndex}>
          {unitIndex > 0 && <wbr />}
          {unit.length <= NOWRAP_MAX ? (
            <span className="whitespace-nowrap">{unit}</span>
          ) : (
            unit
          )}
        </Fragment>
      ))}
    </Fragment>
  ))
}
