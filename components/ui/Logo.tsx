import Image from "next/image";

const ASPECT_RATIO = 881 / 563;

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  size?: number;
}

export function Logo({ className = "", withWordmark = false, size = 28 }: LogoProps) {
  const width = Math.round(size * ASPECT_RATIO);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/logo-white.png"
        alt="Fly Prep"
        width={width}
        height={size}
        priority
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-black tracking-[-0.02em] text-white">
            FLY PREP
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-text-secondary">
            Academy
          </span>
        </span>
      )}
    </div>
  );
}
