import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

// Articles database (in a real app, this would come from a CMS or API)
const articlesData = {
  "why-update-website": {
    id: 1,
    title: "Why Should I Update My Website?",
    excerpt: "Discover the essential reasons to update your website in 2025 and how it can boost your business growth and user engagement.",
    date: "January 15, 2025",
    author: "Alex Morgan",
    category: "Web Development",
    imageUrl: "/article.jpg",
    content: `
      <h2 id="introduction">Introduction</h2>
      <p>In today's rapidly evolving digital landscape, having an outdated website can significantly impact your business's success. As we move further into 2025, technological advancements, user expectations, and search engine algorithms continue to evolve at an unprecedented pace. This article explores the critical reasons why updating your website should be a top priority this year.</p>
      
      <div class="table-of-contents bg-white/5 p-6 rounded-xl my-8 border border-white/10">
        <h3 class="text-xl mb-4">Table of Contents</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><a href="#introduction" class="hover:underline">Introduction</a></li>
          <li><a href="#performance" class="hover:underline">Enhanced Performance and Speed</a></li>
          <li><a href="#mobile" class="hover:underline">Mobile-First Experience</a></li>
          <li><a href="#security" class="hover:underline">Improved Security Measures</a></li>
          <li><a href="#seo" class="hover:underline">SEO Advantages</a></li>
          <li><a href="#user-experience" class="hover:underline">Better User Experience</a></li>
          <li><a href="#competitive" class="hover:underline">Competitive Edge</a></li>
          <li><a href="#integration" class="hover:underline">Modern Technology Integration</a></li>
          <li><a href="#conclusion" class="hover:underline">Conclusion</a></li>
        </ul>
      </div>
      
      <h2 id="performance">Enhanced Performance and Speed</h2>
      <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80" alt="Website speed metrics on computer screen" class="w-full h-auto rounded-xl my-6" />
      <p>Website loading speed has become a critical factor in user retention and conversion rates. According to recent studies, 53% of mobile users abandon websites that take longer than three seconds to load. Modern web technologies and optimization techniques can significantly improve your site's performance:</p>
      <ul>
        <li>Implementation of lazy loading for images and videos</li>
        <li>Utilization of next-generation image formats like WebP and AVIF</li>
        <li>Advanced caching strategies</li>
        <li>Code splitting and bundling techniques</li>
        <li>Content Delivery Networks (CDNs) for global accessibility</li>
      </ul>
      <p>By updating your website with these performance enhancements, you can dramatically improve user engagement metrics and conversion rates.</p>
      
      <h2 id="mobile">Mobile-First Experience</h2>
      <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format&fit=crop&q=80" alt="Person using smartphone to browse websites" class="w-full h-auto rounded-xl my-6" />
      <p>In 2025, mobile traffic accounts for over 65% of global web traffic. If your website isn't optimized for mobile devices, you're potentially losing a significant portion of your audience. A modern website update includes:</p>
      <ul>
        <li>Responsive design that adapts to any screen size</li>
        <li>Touch-friendly navigation and interactive elements</li>
        <li>Optimized font sizes and spacing for mobile readability</li>
        <li>Simplified forms and checkout processes for mobile users</li>
        <li>Mobile-specific features like click-to-call and location-based services</li>
      </ul>
      <p>Google's mobile-first indexing means that the mobile version of your website is the primary version considered for ranking, making mobile optimization more important than ever.</p>
      
      <h2 id="security">Improved Security Measures</h2>
      <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80" alt="Computer security concept with lock" class="w-full h-auto rounded-xl my-6" />
      <p>Cybersecurity threats continue to evolve in sophistication and frequency. An outdated website can be vulnerable to various attacks, potentially compromising your data and your customers' information. Updating your website enhances security through:</p>
      <ul>
        <li>Implementation of HTTPS and TLS 1.3 protocols</li>
        <li>Regular security patches and updates</li>
        <li>Advanced authentication methods including biometric verification</li>
        <li>Web Application Firewalls (WAF) protection</li>
        <li>Compliance with data protection regulations like GDPR and CCPA</li>
      </ul>
      <p>Security breaches can severely damage your reputation and result in significant financial losses. A secure, updated website builds trust with your visitors and protects your business.</p>
      
      <h2 id="seo">SEO Advantages</h2>
      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80" alt="SEO and analytics data on computer screen" class="w-full h-auto rounded-xl my-6" />
      <p>Search engine algorithms are continuously evolving, with a growing emphasis on user experience metrics. Google's 2025 algorithm updates place significant weight on Core Web Vitals, which measure loading performance, interactivity, and visual stability. Updating your website provides SEO benefits through:</p>
      <ul>
        <li>Improved Core Web Vitals scores</li>
        <li>Enhanced semantic HTML structure</li>
        <li>Better mobile optimization</li>
        <li>Faster loading times</li>
        <li>Implementation of structured data markup</li>
        <li>Improved content organization and information architecture</li>
      </ul>
      <p>Higher search engine rankings translate to increased organic traffic, lower customer acquisition costs, and more qualified leads for your business.</p>
      
      <h2 id="user-experience">Better User Experience</h2>
      <img src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&auto=format&fit=crop&q=80" alt="User interface design on computer screen" class="w-full h-auto rounded-xl my-6" />
      <p>User expectations have evolved dramatically in recent years. Today's web users expect intuitive navigation, personalized content, and seamless interactions. Updating your website allows you to enhance the user experience through:</p>
      <ul>
        <li>Intuitive information architecture</li>
        <li>Accessibility improvements for users with disabilities</li>
        <li>Personalization based on user behavior and preferences</li>
        <li>Interactive elements and micro-animations that guide users</li>
        <li>Streamlined conversion paths and call-to-action placement</li>
        <li>AI-powered chatbots and virtual assistants for immediate support</li>
      </ul>
      <p>A better user experience leads to longer session durations, lower bounce rates, and higher conversion rates – directly impacting your bottom line.</p>
      
      <h2 id="competitive">Competitive Edge</h2>
      <img src="https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=80" alt="Business competition concept with chess pieces" class="w-full h-auto rounded-xl my-6" />
      <p>Your website is often the first point of contact between your business and potential customers. An outdated website can create a negative first impression and send visitors to your competitors. By updating your website, you gain competitive advantages through:</p>
      <ul>
        <li>Modern design that reflects current trends and preferences</li>
        <li>Enhanced functionality that meets user expectations</li>
        <li>Differentiation through unique experiences and features</li>
        <li>Better integration with marketing campaigns and social media</li>
        <li>Improved brand perception and credibility</li>
      </ul>
      <p>Your updated website becomes a powerful sales and marketing tool that helps you stand out in a crowded marketplace.</p>
      
      <h2 id="integration">Modern Technology Integration</h2>
      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80" alt="Modern technology integration concept" class="w-full h-auto rounded-xl my-6" />
      <p>Technological advancements in 2025 offer unprecedented opportunities to enhance your website's capabilities. Updating your website allows you to integrate cutting-edge technologies such as:</p>
      <ul>
        <li>Artificial Intelligence for personalized user experiences</li>
        <li>Augmented Reality for product visualization</li>
        <li>Voice search optimization</li>
        <li>Progressive Web App (PWA) capabilities for offline access</li>
        <li>Advanced analytics and data visualization tools</li>
        <li>Integration with IoT devices and smart home systems</li>
      </ul>
      <p>These technologies can transform how users interact with your brand and open new business opportunities.</p>
      
      <h2 id="conclusion">Conclusion</h2>
      <p>Updating your website in 2025 is no longer just about keeping up with design trends—it's a strategic business decision that impacts your visibility, credibility, security, and bottom line. As digital experience expectations continue to evolve, an updated website becomes essential for businesses that want to remain competitive and relevant.</p>
      <p>By investing in a website update, you're investing in your business's future, creating a foundation for digital success that can adapt to changing technologies and user behaviors. Whether you're looking to increase conversions, improve user engagement, or strengthen your brand, a website update is a critical step toward achieving your business goals in 2025 and beyond.</p>
    `,
  }
}

// Type for our articles data structure
type ArticlesData = typeof articlesData;
type ArticleSlug = keyof ArticlesData;

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // Type guard to check if slug is a valid key in our articlesData
  const isValidSlug = (slug: string): slug is ArticleSlug => {
    return slug in articlesData;
  }
  
  // Redirect "coming-soon" articles back to the articles page
  if (slug === "coming-soon") {
    return (
      <main className="bg-[#030303] min-h-screen">
        <Navigation />
        
        <section className="pt-32 pb-24 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Coming Soon!
            </h1>
            <p className="text-white/70 text-lg mb-8">
              This article is currently being written and will be available soon.
            </p>
            <Link href="/articles" className="text-white font-medium bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full px-8 py-3 hover:opacity-90 transition-opacity">
              Back to Articles
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    )
  }
  
  if (!isValidSlug(slug)) {
    notFound()
  }
  
  const article = articlesData[slug]

  return (
    <main className="bg-[#030303] min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/articles" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Articles
            </Link>
          </div>
          
          <article
            className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm"
          >
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
              <Image 
                src={article.imageUrl} 
                alt={article.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                quality={100}
                className="transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-80"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {article.category}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                    {article.date}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {article.title}
                </h1>
                
                <p className="text-white/70 text-lg mb-4">
                  By {article.author}
                </p>
              </div>
            </div>
            
            <div className="p-6 md:p-12">
              <div 
                className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-indigo-300 hover:prose-a:text-indigo-200 prose-strong:text-white/90 prose-li:text-white/70"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            <div className="p-6 md:p-12 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Share this article</h3>
                  <div className="flex gap-4">
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                    </button>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                      </svg>
                    </button>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <Link href="/articles" className="text-white font-medium bg-gradient-to-r from-indigo-500/10 to-rose-500/10 border border-white/10 rounded-full px-6 py-3 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-rose-500/20 hover:border-white/20 transition-all">
                  View More Articles
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
} 