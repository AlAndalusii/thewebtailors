"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 85,
  sizes = "100vw",
  placeholder = "empty",
  blurDataURL
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          sizes={sizes}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }}
        />
      )}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  )
} 