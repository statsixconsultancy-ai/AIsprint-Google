import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import ArticleAudioPlayer from "../../components/ArticleAudioPlayer"

import {
  getBlogBySlug,
  getRelatedBlogs,
  getLatestBlogs
} from "@/lib/blog/supabase-queries"

import BlogCard from "../../components/BlogCard"

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { category: string; slug: string }
}

// ✅ SAFE METADATA (prevents build crash)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const blog = await getBlogBySlug(params.category, params.slug)

    if (!blog) {
      return { title: "Post Not Found" }
    }

    const title = blog.meta_title || `${blog.title} | GoAI Sprint Blog`
    const description = blog.meta_description || blog.excerpt

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: blog.published_at || undefined,
        modifiedTime: blog.updated_at,
        authors: [blog.author],
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
      alternates: {
        canonical: `https://goaisprint.com/blog/${params.category}/${params.slug}`,
      },
    }
  } catch (err) {
    console.error("Metadata error:", err)
    return { title: "Blog" }
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: PageProps) {
  let blog = null
  let relatedBlogs: any[] = []
  let latestBlogs: any[] = []

  try {
    const results = await Promise.all([
      getBlogBySlug(params.category, params.slug),
      getBlogBySlug(params.category, params.slug).then((b) =>
        b ? getRelatedBlogs(params.category, b.id, 3) : []
      ),
      getLatestBlogs(3)
    ])

    blog = results[0]
    relatedBlogs = results[1]
    latestBlogs = results[2]
  } catch (err) {
    console.error("Blog fetch error:", err)
  }

  if (!blog) {
    notFound()
  }

  const formattedDate = new Date(
    blog.published_at || blog.created_at
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="pt-10 pb-16 min-h-screen bg-white">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            author: {
              "@type": "Person",
              name: blog.author,
            },
            publisher: {
              "@type": "Organization",
              name: "GoAI Sprint",
              logo: {
                "@type": "ImageObject",
                url: "https://goaisprint.com/logo.png",
              },
            },
            datePublished: blog.published_at || blog.created_at,
            dateModified: blog.updated_at,
            description: blog.excerpt,
          }),
        }}
      />

      <header className="blog-container text-center">
        <div className="blog-meta">
          {formattedDate} • {blog.category_name}
        </div>

        <h1 className="blog-title">{blog.title}</h1>

        {blog.excerpt && (
          <p className="blog-excerpt">{blog.excerpt}</p>
        )}
      </header>

      <div className="blog-container blog-audio">
        <ArticleAudioPlayer content={blog.content} title={blog.title} />
      </div>

      <div className="blog-container blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>

      {/* LATEST */}
      {latestBlogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-16 border-t pt-10">
          <h3 className="text-xl font-semibold mb-8">Latest</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {latestBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.category_slug}/${post.slug}`}
              >
                <div className="group">
                  <h4 className="font-medium mb-2 group-hover:underline">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {post.category_name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* RELATED */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mt-20 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard key={relatedBlog.id} {...relatedBlog} />
            ))}
          </div>
        </section>
      )}

    </article>
  )
}