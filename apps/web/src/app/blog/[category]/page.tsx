import Link from "next/link"

export const dynamic = "force-dynamic"

interface PageProps {
  params: { category: string }
}

export default async function CategoryPage({ params }: PageProps) {
  // 🚫 STOP supabase during build
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("⚠️ Skipping category fetch during build")
    return <div>Loading category...</div>
  }

  // ✅ load only at runtime
  const { createClient } = await import("@supabase/supabase-js")

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("category_slug", params.category)

  if (error) {
    console.error(error)
    return <div>Error loading category</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {params.category}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs?.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.category_slug}/${post.slug}`}
          >
            <div className="border p-4 rounded-md hover:shadow">
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                {post.category_name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}