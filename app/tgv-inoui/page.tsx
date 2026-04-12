import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";

const UPDATED = "2026-04-12";

export const metadata: Metadata = {
  title: "Sens de la marche TGV INOUI : vérifier l'orientation de sa place",
  description:
    "Savoir si votre siège TGV INOUI est dans le sens de la marche. Outil gratuit, toutes voitures, toutes rames Duplex. Résultat immédiat.",
  alternates: { canonical: "/tgv-inoui" },
  openGraph: {
    title: "Sens de la marche TGV INOUI",
    description: "Vérifier l'orientation de votre place TGV INOUI avant le départ.",
    url: "/tgv-inoui",
    type: "article",
  },
};

const FAQ = [
  {
    q: "Toutes les rames TGV INOUI ont-elles la même disposition ?",
    a: "La majorité des TGV INOUI utilisent des rames Duplex (deux étages). Certaines relations circulent en rames Atlantique ou Réseau, à un seul niveau : la logique d'alternance reste valable, mais les numéros de salle haute/basse n'existent pas.",
  },
  {
    q: "Les sièges en carré (face à face) sont-ils forcément à moitié dos à la marche ?",
    a: "Oui. Dans un carré de 4 sièges face à face, deux voyageurs sont forcément dos à la marche. Si vous voyagez seul et préférez éviter, choisissez un siège dans une rangée non-carré (groupes de 2 côte-à-côte).",
  },
  {
    q: "Comment choisir sa place dans le sens de la marche en réservant sur SNCF Connect ?",
    a: "SNCF Connect affiche un plan de voiture avec une petite flèche indiquant le sens du train. Les sièges avec la flèche pointant vers l'avant sont dans le sens de la marche. Notre outil vous permet de vérifier a posteriori si le plan affiché ne le précise pas.",
  },
];

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sensdelamarche.fr" },
      { "@type": "ListItem", position: 2, name: "TGV INOUI", item: "https://sensdelamarche.fr/tgv-inoui" },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sens de la marche sur un TGV INOUI",
    description:
      "Savoir si votre siège TGV INOUI est dans le sens de la marche.",
    url: "https://sensdelamarche.fr/tgv-inoui",
    datePublished: "2026-04-12",
    dateModified: UPDATED,
    inLanguage: "fr-FR",
    author: { "@id": "https://sensdelamarche.fr/#organization" },
    publisher: { "@id": "https://sensdelamarche.fr/#organization" },
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-[#6E1E78]">
                  TGV INOUI
                </p>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                  Sens de la marche sur un TGV INOUI
                </h1>
                <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
                  Votre place TGV INOUI est-elle face à la marche ou dos à la marche&nbsp;?
                  Vérifiez-le en 10 secondes avec le trajet, la voiture et le numéro de siège
                  indiqués sur votre billet.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <SeatFinder defaultTrain="inoui" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pt-10">
          <AnswerBox question="Comment savoir si mon siège TGV INOUI est dans le sens de la marche ?">
            L&apos;orientation d&apos;un siège TGV INOUI dépend de quatre paramètres&nbsp;:
            le trajet (qui fixe le sens de circulation), le numéro de voiture (pair ou
            impair), le numéro de place (groupe de 4) et l&apos;étage (salle basse jusqu&apos;à
            la place 39, salle haute à partir de 40). L&apos;outil ci-dessus combine ces
            quatre paramètres et donne le résultat immédiatement.
          </AnswerBox>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            Comment fonctionne l&apos;orientation des sièges sur TGV INOUI
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              Les TGV INOUI circulent principalement en rames <strong>Duplex</strong> à deux étages
              (salle basse et salle haute). Les sièges sont installés par groupes de 4 en
              face-à-face&nbsp;: deux voyageurs dans le sens de la marche, deux dos à la marche.
              Cette alternance se répète tout au long de la voiture, et s&apos;inverse entre salle
              basse et salle haute, entre voitures paires et impaires.
            </p>
            <p>
              Concrètement, le sens de votre siège dépend donc de&nbsp;:
            </p>
            <ul className="ml-5 list-disc space-y-1 text-neutral-700">
              <li>le sens de circulation du train (lié aux gares de départ et d&apos;arrivée)&nbsp;;</li>
              <li>le numéro de voiture (pair ou impair)&nbsp;;</li>
              <li>le numéro de place et sa position dans le groupe de 4&nbsp;;</li>
              <li>l&apos;étage (salle basse jusqu&apos;à 39, salle haute à partir de 40).</li>
            </ul>
            <p>
              Notre outil combine ces quatre paramètres et vous donne le résultat immédiatement.
            </p>
          </div>
        </article>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-900">
              TGV INOUI 1ère classe : orientation des sièges
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              En 1ère classe (voitures 1 à 3 selon les rames), la logique est identique&nbsp;:
              sièges par groupes de 4 avec deux face à la marche et deux dos. Le confort est
              supérieur (fauteuil plus large, plus d&apos;espace) mais cela ne change pas
              l&apos;orientation. L&apos;outil fonctionne pareil pour la 1ère et la 2nde classe.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-900">Questions fréquentes TGV INOUI</h2>
          <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-neutral-900">
                  {f.q}
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="jsonld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id="jsonld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
