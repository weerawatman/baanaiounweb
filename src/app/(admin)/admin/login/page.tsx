"use client"

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Loader2, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login, type LoginState } from "./actions"
import { SITE_CONFIG } from "@/config/site"

function LoginForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/admin"
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  )

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="redirect" value={redirect} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          อีเมล
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="admin@baanaioun.com"
          required
          disabled={pending}
          className="h-11"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          รหัสผ่าน
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          disabled={pending}
          className="h-11"
        />
      </div>

      {state.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="size-4 shrink-0" />
          {state.error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-1 gap-2 bg-primary text-white hover:bg-primary/90"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            กำลังเข้าสู่ระบบ...
          </>
        ) : (
          <>
            <Lock className="size-4" />
            เข้าสู่ระบบ
          </>
        )}
      </Button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg ring-1 ring-foreground/5">
        <div className="mb-6 text-center">
          <h1 className="text-lg font-bold text-primary">{SITE_CONFIG.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">ระบบจัดการหลังบ้าน</p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
