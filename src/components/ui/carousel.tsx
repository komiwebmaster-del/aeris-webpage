'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function Carousel({ images, className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const currentIndex = emblaApi?.selectedScrollSnap() ?? 0;

  return (
    <div className={cn('relative', className)}>
      <div ref={emblaRef} className="overflow-hidden rounded-md">
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/10] bg-gray-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-small text-gray-500">
          {currentIndex + 1}/{images.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            aria-label="이전 이미지"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors duration-fast hover:border-navy-900 hover:text-navy-900"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="다음 이미지"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors duration-fast hover:border-navy-900 hover:text-navy-900"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
