/** Allowlisted Storage subfolders under `property-images/uploads/`. */
export const UPLOAD_STORAGE_FOLDERS = {
  general: "",
  successStories: "success-stories",
  testimonials: "testimonials",
} as const

export type UploadStorageFolder =
  (typeof UPLOAD_STORAGE_FOLDERS)[keyof typeof UPLOAD_STORAGE_FOLDERS]

const ALLOWED = new Set<string>(Object.values(UPLOAD_STORAGE_FOLDERS))

/** Build a safe object path inside the property-images bucket. */
export function buildStorageUploadPath(folder: string | null | undefined, fileName: string): string {
  const normalized = folder?.trim() ?? ""
  if (normalized && ALLOWED.has(normalized)) {
    return `uploads/${normalized}/${fileName}`
  }
  return `uploads/${fileName}`
}
