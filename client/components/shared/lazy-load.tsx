"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  minHeight?: string;
  once?: boolean;
}

export function LazyLoad({
  children,
  fallback,
  rootMargin = "150px",
  threshold = 0.01,
  className = "",
  minHeight = "200px",
  once = true,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Small delay to ensure smooth animation and prevent layout shift
            timer = setTimeout(() => {
              setHasLoaded(true);
            }, 100);
            
            if (once) {
              observer.disconnect();
            }
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [rootMargin, threshold, once]);

  const defaultFallback = (
    <div 
      className="w-full glass border-white/40 rounded-xl p-6" 
      style={{ minHeight }}
    >
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 skeleton" />
        <Skeleton className="h-64 w-full skeleton rounded-lg" />
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className={cn("w-full", className)}
      style={{ minHeight: !hasLoaded ? minHeight : undefined }}
    >
      {!hasLoaded ? (
        <div className="animate-pulse opacity-70 transition-opacity duration-300">
          {fallback || defaultFallback}
        </div>
      ) : (
        <div className="animate-lazy-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

