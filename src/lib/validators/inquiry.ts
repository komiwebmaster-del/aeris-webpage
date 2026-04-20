import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z.string().regex(/^[0-9\-+ ]{9,}$/, '올바른 연락처 형식이 아닙니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  type: z.enum(['b2b', 'b2c'], { message: '문의 유형을 선택해주세요' }),
  message: z.string().max(500, '문의 내용은 500자 이내로 작성해주세요').optional(),
  agreeTerms: z.literal(true, { message: '개인정보 수집에 동의해주세요' }),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
