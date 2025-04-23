import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const articles = [
  {
    id: 1,
    title: "Why Should I Update My Website?",
    excerpt: "Discover the essential reasons to update your website in 2025 and how it can boost your business growth and user engagement.",
    date: "January 15, 2025",
    category: "Web Development",
    imageUrl: "/article.jpg",
    slug: "why-update-website"
  },
  {
    id: 2,
    title: "Coming Soon: The Future of Web Animation",
    excerpt: "Our comprehensive guide to cutting-edge web animation techniques will help you create more engaging user experiences.",
    date: "Coming Soon",
    category: "Design",
    imageUrl: "/placeholder.jpg",
    slug: "coming-soon"
  },
  {
    id: 3,
    title: "Coming Soon: Accessibility Best Practices",
    excerpt: "Learn how to make your website accessible to all users and comply with the latest standards and regulations.",
    date: "Coming Soon",
    category: "Accessibility",
    imageUrl: "/placeholder.jpg",
    slug: "coming-soon"
  },
  {
    id: 4,
    title: "Coming Soon: Website Security Essentials",
    excerpt: "Protect your website and your users with these essential security practices and tools.",
    date: "Coming Soon",
    category: "Security",
    imageUrl: "/placeholder.jpg",
    slug: "coming-soon"
  },
]

export default function Articles() {
  return (
    <main className="bg-[#030303] min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Our
              </span>
              <span
                className={cn(
                  " ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                  pacifico.className,
                )}
              >
                Articles
              </span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Insights, tips, and trends from our team of design experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <article 
                key={article.id}
                className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group hover:scale-105"
              >
                <Link href={`/articles/${article.slug}`} className="block">
                  <div className="relative h-56 overflow-hidden">
                    {article.id === 1 ? (
                      <Image 
                        src={article.imageUrl} 
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-rose-500/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white/40 text-xl">Article Image</div>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 to-transparent opacity-70"></div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {article.category}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
                      {article.date}
                    </span>
                  </div>
                  <Link href={`/articles/${article.slug}`} className="block group-hover:opacity-90 transition-opacity">
                    <h3 className="text-xl text-white font-medium mb-2">{article.title}</h3>
                  </Link>
                  <p className="text-white/60 text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="text-sm text-white font-medium bg-gradient-to-r from-indigo-500/10 to-rose-500/10 border border-white/10 rounded-full px-5 py-2 inline-block transition-all hover:border-white/30 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-rose-500/20"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="text-white font-medium bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full px-8 py-3 hover:opacity-90 transition-opacity">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 