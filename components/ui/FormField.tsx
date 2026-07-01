import { InputHTMLAttributes, forwardRef } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField({ label, error, className = "", ...props }, ref) {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={props.id ?? props.name}
          className="text-[12px] font-medium uppercase tracking-[0.08em] text-text-secondary"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={props.id ?? props.name}
          className={`min-h-11 rounded-xl border bg-white/5 px-4 text-[16px] text-white placeholder:text-text-tertiary outline-none transition-colors focus:border-orange-accent ${
            error ? "border-red-400" : "border-white/[0.08]"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[13px] text-red-400">{error}</p>}
      </div>
    );
  },
);
