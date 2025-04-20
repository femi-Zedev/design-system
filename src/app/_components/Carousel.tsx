import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import Image from 'next/image';
import FallbackImage from './FallbackImage';

interface SlideItem {
  image: string; // Required property
  [key: string]: any; // Allows for any additional properties
  format: string;
  title: string;
}

export default function Carousel({
  slides,
  className,
  thumbnailLimit = 6,
  buttonPosition = 'absolute',
  currentIndex: externalCurrentIndex,
  onSlideChange,
}: {
  slides: SlideItem[];
  className?: string;
  thumbnailLimit?: number;
  buttonPosition?: 'absolute' | 'relative';
  currentIndex?: number;
  onSlideChange?: (index: number) => void;
}) {
  const [internalCurrentIndex, setInternalCurrentIndex] = useState(0);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  // Use external index if provided, otherwise use internal state
  const currentIndex =
    externalCurrentIndex !== undefined ? externalCurrentIndex : internalCurrentIndex;

  // Update internal state when external index changes
  useEffect(() => {
    if (externalCurrentIndex !== undefined) {
      setInternalCurrentIndex(externalCurrentIndex);
    }
  }, [externalCurrentIndex]);

  const nextSlide = () => {
    if (slides.length <= 1) return;

    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setInternalCurrentIndex(newIndex);
    if (onSlideChange) onSlideChange(newIndex);
  };

  const previousSlide = () => {
    if (slides.length <= 1) return;

    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setInternalCurrentIndex(newIndex);
    if (onSlideChange) onSlideChange(newIndex);
  };

  const goToSlide = (index: number) => {
    setInternalCurrentIndex(index);
    if (onSlideChange) onSlideChange(index);
  };

  const getVisibleThumbnails = () => {
    const totalSlides = slides.length;
    const visibleRangeStart = Math.floor(currentIndex / thumbnailLimit) * thumbnailLimit;
    const visibleRangeEnd = Math.min(visibleRangeStart + thumbnailLimit, totalSlides);
    return slides.slice(visibleRangeStart, visibleRangeEnd);
  };

  const visibleThumbnails = getVisibleThumbnails();

  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      {/* Title Section */}
      <div className='flex flex-col justify-center w-full'>
        {slides[currentIndex].title && buttonPosition == 'absolute' && (
          <div className='mb-2 mx-auto w-[360px] text-center'>
            <div className='flex items-center gap-2 justify-center'>
              <h2 className='display-xs font-semibold'>{slides[currentIndex].title}</h2>
              <Crown className='w-5 h-5 text-orange-500' />
            </div>
            <p className='text-base text-gray-500 font-normal'>{slides[currentIndex].format}</p>
          </div>
        )}

        {/* Main Carousel */}
        <div className='relative mx-auto w-full'>
          <div
            id='carousel-wrapper'
            className={cn(
              buttonPosition == 'relative' ? ' w-[408px] rounded-md' : ' w-[360px] rounded-xs',
              'relative h-[475px] overflow-hidden mx-auto',
            )}
          >
            {buttonPosition == 'relative' && (
              <button
                className={cn(
                  'z-50 absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1.5 rounded-full disabled:opacity-60 disabled:cursor-not-allowed',
                )}
                onClick={previousSlide}
                disabled={currentIndex == 0}
              >
                <ChevronLeft className='h-4 w-4 text-slate-500' />
                <span className='sr-only'>Previous slide</span>
              </button>
            )}
            {/* Slides */}
            <div
              className='flex z-10 transition-transform duration-500 ease-out '
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map(movie => (
                <div
                  key={movie.id}
                  className={cn(
                    buttonPosition == 'relative' ? ' w-[408px]' : ' w-[360px]',
                    'flex-shrink-0 h-[474px] relative',
                  )}
                >
                  <FallbackImage
                    src={movie.image}
                    alt={movie.title}
                    layout='fill'
                    className=' object-cover'
                    fallbackSrc='/no-image.svg'
                  />
                </div>
              ))}
            </div>
            {buttonPosition == 'relative' && (
              <button
                className={cn(
                  'z-50 absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1.5 rounded-full disabled:opacity-60 disabled:cursor-not-allowed',
                )}
                onClick={nextSlide}
                disabled={currentIndex + 1 == slides.length}
              >
                <ChevronRight className='h-4 w-4 text-slate-500' />
                <span className='sr-only'>Next slide</span>
              </button>
            )}
          </div>
          {buttonPosition == 'absolute' && (
            <>
              <button
                className={cn(
                  'absolute top-1/2 left-0 transform -translate-y-1/2 border border-slate-500 p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed ',
                )}
                onClick={previousSlide}
                disabled={currentIndex == 0}
              >
                <ChevronLeft className='h-6 w-6 text-slate-500' />
                <span className='sr-only'>Previous slide</span>
              </button>
              <button
                className={cn(
                  'absolute top-1/2 right-0 transform -translate-y-1/2 border border-slate-500 p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed ',
                )}
                onClick={nextSlide}
                disabled={currentIndex + 1 == slides.length}
              >
                <ChevronRight className='h-6 w-6 text-slate-500' />
                <span className='sr-only'>Next slide</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className='flex gap-4 mt-6'>
        {visibleThumbnails.map((_, index) => {
          const globalIndex = slides.indexOf(visibleThumbnails[index]); // Get the global index of this thumbnail
          return (
            <button
              key={globalIndex}
              onClick={() => goToSlide(globalIndex)}
              className={cn(
                'relative w-12 h-12 rounded-sm overflow-hidden',
                globalIndex === currentIndex
                  ? 'ring-2 ring-brand-500 ring-offset-2'
                  : 'opacity-70 hover:opacity-100',
              )}
            >
              <FallbackImage
                src={slides[globalIndex].image}
                alt={`Go to ${slides[globalIndex].title}`}
                layout='fill'
                className='rounded-sm object-cover'
                fallbackSrc='/no-image.svg'
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
