/** สร้าง URL สำหรับฝัง Google Maps (embed iframe) */
export function buildGoogleMapsEmbedUrl(opts: {
  lat?: number | null
  lng?: number | null
  address?: string
  zoom?: number
}): string | null {
  const { lat, lng, address, zoom = 15 } = opts
  const hasCoords =
    lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0 && lng !== 0

  if (hasCoords) {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed&hl=th`
  }

  const query = address?.trim()
  if (query) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed&hl=th`
  }

  return null
}

/** ลิงก์เปิด Google Maps เพื่อเลือก/ปรับพิกัด */
export function buildGoogleMapsPickerUrl(opts: {
  lat?: number | null
  lng?: number | null
  address?: string
}): string {
  const { lat, lng, address } = opts
  const hasCoords =
    lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0 && lng !== 0

  if (hasCoords) {
    return `https://www.google.com/maps/@${lat},${lng},17z`
  }

  const query = address?.trim()
  if (query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
  }

  return "https://www.google.com/maps"
}
