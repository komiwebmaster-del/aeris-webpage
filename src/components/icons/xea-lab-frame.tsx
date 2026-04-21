import { cn } from '@/lib/cn';

export type XeaLabFrameVariant = 'frame' | 'frame-1' | 'frame-2' | 'frame-3';

/** `public/images/xea-lab-frames/` 아래 정적 SVG 경로 */
export const XEA_LAB_FRAME_SRC: Record<XeaLabFrameVariant, string> = {
  frame: '/images/xea-lab-frames/frame.svg',
  'frame-1': '/images/xea-lab-frames/frame-1.svg',
  'frame-2': '/images/xea-lab-frames/frame-2.svg',
  'frame-3': '/images/xea-lab-frames/frame-3.svg',
};

export interface XeaLabFrameProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant: XeaLabFrameVariant;
  /** 표시 크기(px). width·height에 동일 적용 (기본 136). */
  size?: number;
}

/**
 * XEA Lab 프레임 일러스트 4종 (`Frame.svg`, `Frame-1` ~ `Frame-3`).
 * 원본은 `public/images/xea-lab-frames/`에 두고 `<img>`로 로드합니다.
 */
export function XeaLabFrame({
  variant,
  size = 136,
  className,
  width,
  height,
  alt = '',
  decoding = 'async',
  ...rest
}: XeaLabFrameProps) {
  return (
    <img
      {...rest}
      src={XEA_LAB_FRAME_SRC[variant]}
      alt={alt}
      width={width ?? size}
      height={height ?? size}
      decoding={decoding}
      className={cn('shrink-0', className)}
    />
  );
}
