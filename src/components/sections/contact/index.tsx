'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
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

const spaceOptions = [
  'spaceBalcony',
  'spaceBathroom',
  'spaceDressroom',
  'spaceWindow',
  'spaceEtc',
] as const;

const interestOptions = [
  'interestShat',
  'interestDrdh',
  'interestRadm',
  'interestUndecided',
] as const;

export function ContactSection() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      spaces: [],
      interests: [],
    },
  });

  const spaces = watch('spaces') ?? [];
  const interests = watch('interests') ?? [];

  const toggleArray = (
    field: 'spaces' | 'interests',
    value: string,
    current: string[],
  ) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, next, { shouldValidate: true });
  };

  const onSubmit = async (_data: InquiryInput) => {
    setStatus('submitting');
    // Phase 4에서 실제 API 연동 — 현재는 UI 검증용 mock
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
  };

  return (
    <Section background="gray" id="contact">
      <Container size="narrow">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="text-h1 font-bold text-navy-900">{t('headline')}</h2>
          <p className="text-body text-gray-700">{t('subtext')}</p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-gray-300 bg-white p-6 lg:p-12">
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
                <div className="flex gap-6">
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

              {/* Applicable Spaces */}
              <FormField label={t('fields.spaces')}>
                <div className="flex flex-wrap gap-3">
                  {spaceOptions.map((key) => (
                    <Checkbox
                      key={key}
                      label={t(`fields.${key}`)}
                      checked={spaces.includes(key)}
                      onChange={() => toggleArray('spaces', key, spaces)}
                    />
                  ))}
                </div>
              </FormField>

              {/* Interests */}
              <FormField label={t('fields.interests')}>
                <div className="flex flex-wrap gap-3">
                  {interestOptions.map((key) => (
                    <Checkbox
                      key={key}
                      label={t(`fields.${key}`)}
                      checked={interests.includes(key)}
                      onChange={() => toggleArray('interests', key, interests)}
                    />
                  ))}
                </div>
              </FormField>

              {/* Message */}
              <FormField
                label={t('fields.message')}
                required
                error={errors.message?.message}
              >
                <Textarea
                  {...register('message')}
                  rows={5}
                  placeholder={t('placeholders.message')}
                  error={errors.message?.message}
                  aria-required="true"
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
        </div>
      </Container>
    </Section>
  );
}
