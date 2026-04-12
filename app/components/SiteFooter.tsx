import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-10 text-[13px] text-neutral-600">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Outil</div>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-neutral-900">Vérifier mon siège</Link></li>
              <li><Link href="/comment-savoir" className="hover:text-neutral-900">Comment savoir</Link></li>
              <li><Link href="/voiture-1" className="hover:text-neutral-900">Voiture 1</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Trains</div>
            <ul className="space-y-2">
              <li><Link href="/tgv-inoui" className="hover:text-neutral-900">TGV INOUI</Link></li>
              <li><Link href="/tgv-ouigo" className="hover:text-neutral-900">OUIGO</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Aide</div>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-neutral-900">FAQ</Link></li>
              <li><Link href="/a-propos" className="hover:text-neutral-900">À propos</Link></li>
              <li>
                <a
                  href="https://github.com/tonoid/sensdelamarche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900"
                >
                  Code source
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">LLM & IA</div>
            <ul className="space-y-2">
              <li><a href="/llms.txt" className="hover:text-neutral-900">/llms.txt</a></li>
              <li><a href="/llms-full.txt" className="hover:text-neutral-900">/llms-full.txt</a></li>
            </ul>
            <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
              Projet indépendant, non affilié à la SNCF, OUIGO ou INOUI.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-[12px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Sens de la marche · Estimation indicative basée sur le schéma TGV Duplex le plus courant.
          </div>
          <div className="text-neutral-500">
            Développé par{" "}
            <a
              href="https://tonoid.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-700 hover:text-neutral-900"
            >
              tonoid.com
            </a>
            , artisan micro-startup. Fait avec{" "}
            <span className="text-[#E5007D]" aria-label="amour">
              ♥
            </span>{" "}
            à Bordeaux sur un MacBook Pro M4 Pro.
          </div>
        </div>
      </div>
    </footer>
  );
}
