"use client"

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { getImageUrl } from '@/lib/environment'
import { LoadingSpinner } from './loading-spinner'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
  aspectRatio?: string
  containerClassName?: string
  overlay?: React.ReactNode
  loadingIndicator?: boolean
  roundedCorners?: boolean
}

export function OptimizedImage({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  alt,
  width,
  height,
  fill = false,
  sizes,
  quality = 80,
  priority = false,
  className,
  style,
  aspectRatio,
  containerClassName,
  overlay,
  loadingIndicator = false,
  roundedCorners = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  
  // Process image URL to ensure consistent rendering across environments
  const processedSrc = error ? fallbackSrc : getImageUrl(src)
  
  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }
  
  // Handle error
  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }
  
  // Determine container style based on aspect ratio
  const containerStyle = aspectRatio 
    ? { 
        position: 'relative', 
        aspectRatio,
        ...style 
      } as React.CSSProperties
    : style
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        roundedCorners && "rounded-lg",
        fill ? "w-full h-full" : "",
        containerClassName
      )}
      style={containerStyle}
    >
      {isLoading && loadingIndicator && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 z-10">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      
      <Image
        src={processedSrc}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill || !!aspectRatio}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        quality={quality}
        priority={priority}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
      
      {overlay && (
        <div className="absolute inset-0 z-10">
          {overlay}
        </div>
      )}
    </div>
  )
}