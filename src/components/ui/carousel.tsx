'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export type SingleSlide = { src: string; alt: string };
export type PairSlide = {
  pair: [
    { src: string; alt: string; label: string },
    { src: string; alt: string; label: string },
  ];
};
export type CarouselSlide = SingleSlide | PairSlide;

interface CarouselProps {
  images: CarouselSlide[];
  className?: string;
}

export function Carousel({ images, className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const hasMultiple = images.length > 1;

  return (
    <div className={cn('relative', className)}>
      <div ref={emblaRef} className="overflow-hidden rounded-md">
        <div className="flex">
          {images.map((slide, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]">
              {'pair' in slide ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {slide.pair.map((img) => (
                    <figure key={img.src} className="flex flex-col">
                      <div className="relative aspect-[3/4] bg-white sm:aspect-[4/5]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 25vw, (min-width: 768px) 25vw, 50vw"
                          quality={95}
                          className="object-contain"
                        />
                      </div>
                      <figcaption className="mt-2 text-center text-small font-medium text-gray-700">
                        {img.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="relative aspect-[4/3] bg-white sm:aspect-[16/10]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                    quality={95}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {hasMultiple && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-small text-gray-500">
            {currentIndex + 1}/{images.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="이전 이미지"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition-colors duration-fast hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="다음 이미지"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition-colors duration-fast hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
