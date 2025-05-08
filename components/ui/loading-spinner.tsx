"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
  fullScreen?: boolean
  color?: "primary" | "secondary" | "white"
}

export function LoadingSpinner({
  size = "md",
  className,
  text,
  fullScreen = false,
  color = "primary"
}: LoadingSpinnerProps) {
  // Size mappings
  const sizesMap = {
    xs: "h-3 w-3 border-[2px]",
    sm: "h-5 w-5 border-[2px]",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-[3px]",
    xl: "h-16 w-16 border-[4px]"
  }
  
  // Color mapping
  const colorMap = {
    primary: "border-t-indigo-600",
    secondary: "border-t-violet-600",
    white: "border-t-white"
  }
  
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }
    }
  }
  
  const baseSpinner = (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className={cn(
          "rounded-full border-transparent animate-spin",
          sizesMap[size],
          colorMap[color]
        )}
      />
      {text && <p className={cn("text-sm text-gray-400", size === "lg" || size === "xl" ? "text-base" : "")}>{text}</p>}
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        {baseSpinner}
      </div>
    )
  }
  
  return baseSpinner
}

// Overlay loading spinner with fade-in animation
export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <LoadingSpinner size="lg" text={message} color="white" />
    </motion.div>
  )
}

// Simple loading indicator for buttons
export function ButtonLoader({ className }: { className?: string }) {
  return (
    <motion.div
      variants={loadingCircleVariants}
      animate="animate"
      className={cn("h-4 w-4 rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent", className)}
    />
  )
}

const loadingCircleVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 0.8,
      ease: "linear"
    }
  }
}