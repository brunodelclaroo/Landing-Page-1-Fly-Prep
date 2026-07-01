interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  iconClassName?: string;
}

export function Logo({ className = "", withWordmark = false, iconClassName = "h-7 w-7" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className={iconClassName} aria-hidden fill="currentColor">
        <path d="M8 88 L92 10 L80 10 L26 68 Z" />
        <path d="M16 92 L78 32 L66 32 L32 76 Z" />
      </svg>
      {withWordmark && (
        <span className="text-[15px] font-black tracking-[-0.02em]">FLY PREP</span>
      )}
    </div>
  );
}
