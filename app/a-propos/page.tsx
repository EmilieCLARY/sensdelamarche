import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "À propos : méthodologie et indépendance",
  description:
    "Qui sommes-nous, comment l'outil calcule l'orientation des sièges TGV, et pourquoi ce projet est indépendant de la SNCF.",
  alternates: { canonical: "/a-propos" },
  openGraph: { title: "À propos de Sens de la marche", url: "/a-propos", type: "article" },
};

const UPDATED = "2026-04-12";

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de Sens de la marche",
    url: "https://sensdelamarche.fr/a-propos",
    inLanguage: "fr-FR",
    dateModified: UPDATED,
    publisher: { "@id": "https://sensdelamarche.fr/#organization" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sensdelamarche.fr" },
      { "@type": "ListItem", position: 2, name: "À propos", item: "https://sensdelamarche.fr/a-propos" },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <header className="mb-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
              À propos de Sens de la marche
            </h1>
            <p className="mt-3 text-[13px] text-neutral-500">Mis à jour le {UPDATED}</p>
          </header>

          <section className="mb-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
            <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-neutral-500">
              Réponse courte
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-800">
              Sens de la marche est un projet indépendant qui propose un outil gratuit de
              vérification de l&apos;orientation des sièges TGV (INOUI et OUIGO, rames Duplex).
              Le calcul est effectué localement dans le navigateur à partir de règles publiques
              d&apos;alternance des sièges.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">Mission</h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Donner à n&apos;importe quel voyageur une réponse claire et immédiate à la
              question «&nbsp;mon siège sera-t-il dans le sens de la marche&nbsp;?&nbsp;», sans
              compte, sans publicité, sans tracking. L&apos;outil s&apos;adresse en particulier
              aux personnes sensibles au mal des transports.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">Méthodologie</h2>
            <p className="mb-3 text-[15px] leading-relaxed text-neutral-700">
              Le calcul applique trois règles publiques connues des schémas TGV Duplex&nbsp;:
            </p>
            <ol className="ml-5 list-decimal space-y-2 text-[15px] leading-relaxed text-neutral-700">
              <li>Alternance des sièges par groupes de 4 en face-à-face tout au long de la voiture.</li>
              <li>Inversion de l&apos;alternance entre voitures paires et voitures impaires.</li>
              <li>Inversion de l&apos;alternance entre salle basse (places 1 à 39) et salle haute (places 40 et plus).</li>
            </ol>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
              Le sens de circulation est déduit de la table des axes TGV français. L&apos;outil
              identifie l&apos;extrémité V1 (avant de la rame côté province) pour chaque trajet
              reconnu, puis combine cette information avec la règle d&apos;alternance pour
              produire l&apos;orientation finale.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Précision et limitations
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              L&apos;estimation est très fiable sur les rames TGV Duplex standard, qui
              constituent la majorité des circulations INOUI et OUIGO. Les rames Euroduplex,
              Atlantique ou Réseau peuvent présenter des variations mineures. En cas de doute,
              le plan de voiture affiché sur le quai ou sur SNCF Connect fait foi. Les trajets
              Intercités, TER et internationaux hors TGV ne sont pas couverts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Indépendance
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Sens de la marche est un projet indépendant. Il n&apos;est ni affilié, ni
              parrainé, ni endossé par la SNCF, la SNCF Voyageurs, TGV INOUI ou OUIGO. Les noms
              et logos de ces marques restent la propriété de leurs détenteurs respectifs et ne
              sont mentionnés qu&apos;à titre descriptif.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Données personnelles
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              L&apos;intégralité du calcul est effectuée dans votre navigateur. Aucune donnée
              de trajet, de voiture ou de place n&apos;est transmise à un serveur. Le site ne
              dépose pas de cookies et n&apos;utilise aucun service de tracking.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Open source
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Le code source est publié sur GitHub&nbsp;:{" "}
              <a
                href="https://github.com/tonoid/sensdelamarche"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                github.com/tonoid/sensdelamarche
              </a>
              . Contributions, signalements de bugs et suggestions bienvenus via les issues du
              dépôt. Le site est développé par{" "}
              <a
                href="https://tonoid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                tonoid.com
              </a>
              , artisan micro-startup basé à Bordeaux.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Citation et réutilisation
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Le contenu textuel peut être cité librement avec attribution à{" "}
              <strong>sensdelamarche.fr</strong>. Une version structurée lisible par les LLM
              est disponible à{" "}
              <a
                href="/llms.txt"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                /llms.txt
              </a>{" "}
              et{" "}
              <a
                href="/llms-full.txt"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                /llms-full.txt
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
      <Script id="jsonld-about" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
