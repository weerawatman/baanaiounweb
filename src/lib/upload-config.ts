/**
 * Shared between the admin image uploader (client) and /api/upload-images
 * (server) so the client-side pre-check and the server's enforced limit
 * never drift apart.
 */
export const ACCEPTED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

export const ACCEPTED_IMAGE_EXT = ".jpg,.jpeg,.png,.webp"

/**
 * Kept under Vercel's serverless request-body ceiling (~4.5 MB) with
 * headroom for multipart/form-data overhead. Files are uploaded one at a
 * time (see ImageUploader), so this is a per-file, not per-batch, limit.
 */
export const MAX_IMAGE_FILE_SIZE_MB = 4
export const MAX_IMAGE_FILE_SIZE_BYTES = MAX_IMAGE_FILE_SIZE_MB * 1024 * 1024
