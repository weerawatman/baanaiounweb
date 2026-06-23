import { createClient } from "@/lib/supabase/server"
import type { Testimonial } from "@/lib/types/property"

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) throw new Error(error.message)
  return (data as Testimonial[]) ?? []
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single()

  if (error) return null
  return data as Testimonial
}
