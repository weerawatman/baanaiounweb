import BlogPostClient from "./BlogPostClient"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <BlogPostClient slug={slug} />
}
