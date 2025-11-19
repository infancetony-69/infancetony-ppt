import React from 'react';

interface ImageWithPreviewProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

export function ImageWithPreview({ src, alt, label, className = "" }: ImageWithPreviewProps) {
  return (
    <div className={`relative bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
      <div className="relative p-4">
        <img 
          src={new URL(`../assets/images/${src}`, import.meta.url).href} 
          alt={alt}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
