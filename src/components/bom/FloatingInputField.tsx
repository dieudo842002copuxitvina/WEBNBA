import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FloatingInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  suffix?: ReactNode;
}

export const FloatingInputField = forwardRef<HTMLInputElement, FloatingInputFieldProps>(
  ({ className, label, error, hint, suffix, id, ...props }, ref) => (
    <div className="space-y-1.5">
      <div
        className={cn(
          'group relative rounded-[1.25rem] border bg-white transition-all duration-200',
          'shadow-[0_1px_2px_0_hsl(122_38%_25%/0.04)]',
          error
            ? 'border-destructive/70 shadow-[0_0_0_4px_hsl(0_72%_51%/0.08)]'
            : 'border-slate-200 focus-within:border-[#2D5A27] focus-within:shadow-[0_0_0_4px_hsl(122_38%_25%/0.08)]',
        )}
      >
        <input
          ref={ref}
          id={id}
          placeholder=" "
          className={cn(
            'peer h-14 w-full rounded-[1.25rem] border-0 bg-transparent px-4 pb-2 pt-5 text-[15px] font-semibold text-slate-900 outline-none',
            'placeholder:text-transparent focus:placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60',
            suffix && 'pr-14',
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-4 top-3 text-[11px] font-semibold tracking-[0.02em] text-slate-500 transition-all duration-200',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:font-medium',
            'peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#2D5A27]',
            error && 'text-destructive peer-focus:text-destructive',
          )}
        >
          {label}
        </label>

        {suffix ? (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
            {suffix}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="flex items-center gap-1 text-[11px] font-medium text-destructive">
          <span className="h-1 w-1 rounded-full bg-destructive" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  ),
);

FloatingInputField.displayName = 'FloatingInputField';
