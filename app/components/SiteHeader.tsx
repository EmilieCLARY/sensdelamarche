import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-neutral-900">
          <span className="inline-block h-5 w-5 rounded-[4px] bg-gradient-to-br from-[#E5007D] to-[#6E1E78]" aria-hidden />
          Sens de la marche
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-neutral-600">
          <Link href="/tgv-inoui" className="hover:text-neutral-900">TGV INOUI</Link>
          <Link href="/tgv-ouigo" className="hover:text-neutral-900">OUIGO</Link>
          <Link href="/comment-savoir" className="hover:text-neutral-900">Guide</Link>
          <Link href="/faq" className="hover:text-neutral-900">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
