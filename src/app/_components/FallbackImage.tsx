'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface FallbackImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  className?: string;
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc = '/no-image.svg',
  className,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState<string | typeof src>(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setImgSrc(fallbackSrc);
    setHasError(true);
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={cn(className, hasError ? 'object-contain' : 'object-cover')}
      onError={handleError}
    />
  );
}
