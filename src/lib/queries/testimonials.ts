import { createClient } from "@/lib/supabase/server"
import type { Testimonial } from "@/lib/types/property"

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, client_name, quote, property_type, rating, avatar_url, sort_order")
    .eq("published", true)
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
