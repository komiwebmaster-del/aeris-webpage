import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 병합 유틸.
 * 충돌하는 유틸리티 클래스(`p-4` vs `p-6`)는 뒤에 오는 것이 이긴다.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
