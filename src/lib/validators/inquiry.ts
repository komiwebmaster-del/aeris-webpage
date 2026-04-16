import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z.string().regex(/^[0-9\-+ ]{9,}$/, '올바른 연락처 형식이 아닙니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  type: z.enum(['b2b', 'b2c'], { message: '문의 유형을 선택해주세요' }),
  spaces: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  message: z.string().min(10, '문의 내용을 10자 이상 작성해주세요'),
  agreeTerms: z.literal(true, { message: '개인정보 수집에 동의해주세요' }),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
