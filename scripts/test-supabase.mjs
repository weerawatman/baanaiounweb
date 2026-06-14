import { readFileSync } from "fs"
import { createClient } from "@supabase/supabase-js"

// อ่านค่าจาก .env.local
const env = Object.fromEntries(
  readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => l.split("=").map((s) => s.trim()))
    .filter(([k]) => k)
    .map(([k, ...v]) => [k, v.join("=")])
)

const url = env["NEXT_PUBLIC_SUPABASE_URL"]
const anonKey = env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]
const serviceKey = env["SUPABASE_SERVICE_ROLE_KEY"]

console.log("Project URL:", url)
console.log("Anon key  :", anonKey ? `${anonKey.slice(0, 20)}...` : "❌ ไม่พบ")
console.log("Service key:", serviceKey ? `${serviceKey.slice(0, 20)}...` : "❌ ไม่พบ")
console.log("")

if (!url || !anonKey || !serviceKey) {
  console.error("❌ ค่า env ไม่ครบ — ตรวจสอบ .env.local")
  process.exit(1)
}

// ── Test 1: anon client (client-side) ─────────────────────────────────────
console.log("🔵 Test 1: Anon client (NEXT_PUBLIC_SUPABASE_ANON_KEY)")
try {
  const anon = createClient(url, anonKey)
  const { error } = await anon.from("form_submissions").select("id").limit(1)
  if (error) {
    console.log("  ⚠️  Query error:", error.message)
    console.log("  (ปกติถ้าตาราง form_submissions ยังไม่ได้สร้าง หรือ RLS บล็อก)")
  } else {
    console.log("  ✅ เชื่อมต่อได้ — anon client ทำงานปกติ")
  }
} catch (e) {
  console.error("  ❌ Connection failed:", e.message)
}

// ── Test 2: service role client (server-side) ─────────────────────────────
console.log("🔵 Test 2: Service role client (SUPABASE_SERVICE_ROLE_KEY)")
try {
  const service = createClient(url, serviceKey, { auth: { persistSession: false } })
  const { data, error } = await service
    .from("form_submissions")
    .select("id")
    .limit(1)
  if (error) {
    console.log("  ⚠️  Query error:", error.message)
    console.log("  (ตาราง form_submissions ยังไม่ได้สร้าง — ต้องรัน SQL setup)")
  } else {
    console.log("  ✅ เชื่อมต่อได้ — service role client ทำงานปกติ")
    console.log("  ✅ ตาราง form_submissions มีอยู่แล้ว — rows:", data?.length ?? 0)
  }
} catch (e) {
  console.error("  ❌ Connection failed:", e.message)
}

// ── Test 3: check reachable tables ────────────────────────────────────────
console.log("🔵 Test 3: ตรวจสอบตารางที่มีอยู่ใน schema public")
try {
  const service = createClient(url, serviceKey, { auth: { persistSession: false } })
  const { data, error } = await service.rpc("pg_catalog.pg_tables").select("tablename").eq("schemaname", "public")
  if (error) {
    // ลอง query information_schema แทน
    const res = await service
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
    if (res.error) {
      console.log("  ℹ️  ไม่สามารถ list tables ผ่าน JS client ได้ (ปกติ)")
    } else {
      console.log("  📋 Tables:", res.data?.map((r) => r.table_name).join(", ") || "(ว่าง)")
    }
  }
} catch {
  console.log("  ℹ️  ข้าม Test 3")
}

console.log("")
console.log("✅ ทดสอบเสร็จสิ้น — ดูผลด้านบน")
