import { cn } from '@/lib/cn';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-small font-medium text-gray-900">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-caption text-danger" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-caption text-gray-500">{hint}</p>}
    </div>
  );
}
