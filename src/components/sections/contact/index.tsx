'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { FadeUp } from '@/components/ui/fade-up';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Radio } from '@/components/ui/radio';
import { Button } from '@/components/ui/button';
import {
  inquirySchema,
  type InquiryInput,
} from '@/lib/validators/inquiry';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryInput) => {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[AERIS 문의] ${data.name} (${data.type.toUpperCase()})`,
          from_name: 'AERIS 랜딩 페이지',
          replyto: data.email,
          botcheck: data.botcheck ?? '',
          이름: data.name,
          연락처: data.phone,
          이메일: data.email,
          문의유형: data.type === 'b2b' ? 'B2B (프로젝트·설비)' : 'B2C (가정·개인)',
          문의내용: data.message?.trim() || '-',
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !json?.success) throw new Error('submit_failed');
      reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section background="gray" id="contact">
      <Container size="narrow">
        {/* Header */}
        <FadeUp delay={0} className="mb-10 space-y-3">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="text-h1 font-bold text-navy-900">{t('headline')}</h2>
          <p className="text-body text-gray-700">{t('subtext')}</p>
        </FadeUp>

        {/* Form Card */}
        <FadeUp delay={0.15} className="rounded-lg border border-gray-300 bg-white p-6 md:p-10 lg:p-16">
          {status === 'success' ? (
            <div className="flex min-h-[200px] items-center justify-center text-center">
              <p className="text-h3 font-medium text-navy-900">{t('success')}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Honeypot — 봇 감지용, 사용자에겐 보이지 않음 */}
              <input
                type="text"
                {...register('botcheck')}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {/* Name */}
              <FormField
                label={t('fields.name')}
                required
                error={errors.name?.message}
              >
                <Input
                  {...register('name')}
                  placeholder={t('placeholders.name')}
                  error={errors.name?.message}
                  aria-required="true"
                />
              </FormField>

              {/* Phone + Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label={t('fields.phone')}
                  required
                  error={errors.phone?.message}
                >
                  <Input
                    {...register('phone')}
                    type="tel"
                    placeholder={t('placeholders.phone')}
                    error={errors.phone?.message}
                    aria-required="true"
                  />
                </FormField>
                <FormField
                  label={t('fields.email')}
                  required
                  error={errors.email?.message}
                >
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder={t('placeholders.email')}
                    error={errors.email?.message}
                    aria-required="true"
                  />
                </FormField>
              </div>

              {/* Inquiry Type */}
              <FormField
                label={t('fields.type')}
                required
                error={errors.type?.message}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                  <Radio
                    {...register('type')}
                    value="b2b"
                    label={t('fields.typeB2b')}
                  />
                  <Radio
                    {...register('type')}
                    value="b2c"
                    label={t('fields.typeB2c')}
                  />
                </div>
              </FormField>

              {/* Message */}
              <FormField
                label={t('fields.message')}
                error={errors.message?.message}
              >
                <Textarea
                  {...register('message')}
                  rows={5}
                  placeholder={t('placeholders.message')}
                  error={errors.message?.message}
                />
              </FormField>

              {/* Agree Terms */}
              <div>
                <Checkbox
                  {...register('agreeTerms')}
                  label={t('fields.agreeTerms')}
                />
                {errors.agreeTerms && (
                  <p className="mt-1 text-caption text-danger" role="alert">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>

              {/* Error banner */}
              {status === 'error' && (
                <p className="rounded-md bg-danger/10 px-4 py-3 text-small text-danger">
                  {t('error')}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={status === 'submitting'}
                className="w-full sm:w-auto"
              >
                {status === 'submitting' ? t('submitting') : t('submit')}
              </Button>
            </form>
          )}
        </FadeUp>
      </Container>
    </Section>
  );
}
