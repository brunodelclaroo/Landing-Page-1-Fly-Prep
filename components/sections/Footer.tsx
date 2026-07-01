import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-5 py-12 md:px-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <Logo withWordmark className="justify-center md:justify-start" />
          <p className="mt-1 text-[14px] text-text-secondary">
            Score isn&apos;t luck. It&apos;s method.
          </p>
          <p className="mt-3 text-[13px] text-text-tertiary">
            © 2026 Fly Prep. Built in Brazil.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[14px] text-text-secondary md:items-end">
          <a href="#" className="hover:text-orange-accent">
            Instagram
          </a>
          <a href="mailto:hello@flyprep.com" className="hover:text-orange-accent">
            Contact
          </a>
          <a href="/privacy" className="hover:text-orange-accent">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
