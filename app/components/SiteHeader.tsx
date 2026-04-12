import Link from "next/link";

const NAV = [
  { href: "/tgv-inoui", label: "TGV INOUI" },
  { href: "/tgv-ouigo", label: "OUIGO" },
  { href: "/comment-savoir", label: "Guide" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-[14px] font-semibold tracking-tight text-neutral-900 sm:text-[15px]"
        >
          <span
            className="inline-block h-5 w-5 flex-shrink-0 rounded-[4px] bg-gradient-to-br from-[#E5007D] to-[#6E1E78]"
            aria-hidden
          />
          <span className="truncate">Sens de la marche</span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] text-neutral-600 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-neutral-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative md:hidden">
          <summary
            className="flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-neutral-200 px-3 text-[13px] font-medium text-neutral-700 [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            Menu
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-neutral-100 px-4 py-3 text-[14px] text-neutral-700 last:border-0 hover:bg-neutral-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
