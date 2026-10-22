import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";
import { SITE_URL } from "@/lib/site";

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
    a: "Non. Une majorité de TGV INOUI circulent en rames Duplex (deux étages), mais les plans diffèrent entre Duplex 2N/Euroduplex et Duplex 1re génération, et les rames Océane, Atlantique/Réseau ou TGV M ne sont pas encore relevées. Quand les deux plans Duplex divergent pour une place, l'outil répond « dépend du type de rame » au lieu de choisir.",
  },
  {
    q: "Les sièges en carré (face à face) sont-ils forcément à moitié dos à la marche ?",
    a: "Dans un carré de quatre sièges face à face, deux personnes regardent dans un sens et deux dans l'autre, oui. Mais cela ne suffit pas à prédire votre place : sur un plan réel, les sièges ne s'alternent pas régulièrement par groupes de 2 ou de 4, et les ruptures (portes, escaliers, bar, salons d'extrémité) cassent toute règle arithmétique. C'est pourquoi l'outil part des plans relevés place par place, et non d'une formule.",
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "TGV INOUI", item: `${SITE_URL}/tgv-inoui` },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sens de la marche sur un TGV INOUI",
    description:
      "Savoir si votre siège TGV INOUI est dans le sens de la marche.",
    url: `${SITE_URL}/tgv-inoui`,
    datePublished: "2026-04-12",
    dateModified: UPDATED,
    inLanguage: "fr-FR",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 flex flex-col justify-center lg:order-1">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#6E1E78] sm:text-[12px]">
                  TGV INOUI
                </p>
                <h1 className="text-[28px] font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
                  Sens de la marche sur un TGV INOUI
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                  Votre place TGV INOUI est-elle face à la marche ou dos à la marche&nbsp;?
                  Vérifiez-le en 10 secondes avec le trajet, la voiture et le numéro de siège
                  indiqués sur votre billet.
                </p>
              </div>
              <div className="order-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:order-2">
                <SeatFinder defaultTrain="inoui" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pt-10">
          <AnswerBox question="Comment savoir si mon siège TGV INOUI est dans le sens de la marche ?">
            En deux temps. L&apos;orientation de votre place par rapport à la voiture 1 se lit sur
            le plan d&apos;aménagement du type de rame (Duplex 2N, Euroduplex, Duplex 1re
            génération)&nbsp;: l&apos;outil ci-dessus la donne dès le numéro de voiture et de
            place, y compris pour les numéros à trois chiffres utilisés depuis décembre 2025.
            Reste le côté où sera la voiture 1, que la réservation ne dit pas&nbsp;: il se lit sur
            l&apos;afficheur du quai le jour du départ. Si la voiture 1 est côté gare
            d&apos;arrivée, les places tournées vers elle sont dans le sens de la marche.
          </AnswerBox>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            Comment fonctionne l&apos;orientation des sièges sur TGV INOUI
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              Les TGV INOUI circulent principalement en rames <strong>Duplex</strong> à deux étages
              (salle basse et salle haute). Il n&apos;existe pas de règle unique du type «&nbsp;un
              siège sur deux&nbsp;» ou «&nbsp;inversion entre les étages&nbsp;»&nbsp;: sur un plan
              réel, l&apos;orientation change par blocs, avec des ruptures autour des portes, des
              escaliers et du bar. C&apos;est pour cela que le modèle lit les plans place par place
              au lieu de calculer une alternance.
            </p>
            <p>Ce dont dépend le résultat&nbsp;:</p>
            <ul className="ml-5 list-disc space-y-1 text-neutral-700">
              <li>le type de rame, qui détermine le plan (les deux générations de Duplex divergent
                sur quelques places de la voiture 1&nbsp;: l&apos;outil le dit) ;</li>
              <li>le numéro de voiture, ou plus exactement le numéro de voiture dans sa rame
                (les voitures 11 à 18 reprennent le plan des voitures 1 à 8) ;</li>
              <li>le numéro de place, préfixe de voiture compris&nbsp;;</li>
              <li>le côté de la voiture 1 ce jour-là, qui vient des observations de terrain et non
                du plan.</li>
            </ul>
            <p>
              Tant qu&apos;aucune observation n&apos;existe pour votre numéro de train, l&apos;outil
              ne vous donne pas un sens, mais la règle à appliquer sur le quai.
            </p>
          </div>
        </article>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-900">
              TGV INOUI 1ère classe : orientation des sièges
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              En 1ère classe (voitures 1 à 3 selon les rames), l&apos;orientation se lit aussi sur
              le plan&nbsp;: aucune règle d&apos;étage ne s&apos;y applique. Attention aux places
              PMR et aux salons d&apos;extrémité, où les deux générations de Duplex ne concordent
              pas&nbsp;; l&apos;outil affiche alors «&nbsp;dépend du type de rame&nbsp;» plutôt
              qu&apos;une réponse fausse.
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
