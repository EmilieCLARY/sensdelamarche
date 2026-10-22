import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";
import { SITE_URL } from "@/lib/site";

const UPDATED = "2026-04-12";

export const metadata: Metadata = {
  title: "Comment savoir le sens de la marche d'un TGV",
  description:
    "Guide complet pour déterminer le sens de la marche sur un TGV INOUI ou OUIGO : règles par voiture, salle basse/haute, par trajet, et outil automatique.",
  alternates: { canonical: "/comment-savoir" },
  openGraph: {
    title: "Comment savoir le sens de la marche d'un TGV",
    description: "Guide complet et outil gratuit pour déterminer le sens de la marche TGV.",
    url: "/comment-savoir",
    type: "article",
  },
};

export default function Page() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment savoir le sens de la marche d'un TGV",
    description:
      "Méthode pour déterminer si une place TGV INOUI ou OUIGO est dans le sens de la marche.",
    totalTime: "PT1M",
    step: [
      { "@type": "HowToStep", name: "Identifier le trajet", text: "Notez la gare de départ et la gare d'arrivée indiquées sur votre billet." },
      { "@type": "HowToStep", name: "Identifier la voiture", text: "Regardez le numéro de voiture sur votre billet (ex : voiture 3)." },
      { "@type": "HowToStep", name: "Identifier la place", text: "Notez le numéro de place à 2 ou 3 chiffres. Les places 40 et plus sont en salle haute." },
      { "@type": "HowToStep", name: "Vérifier avec l'outil", text: "Entrez ces informations dans l'outil pour obtenir l'orientation immédiatement." },
    ],
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Comment savoir", item: `${SITE_URL}/comment-savoir` },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comment savoir le sens de la marche d'un TGV",
    description:
      "Guide complet pour déterminer l'orientation d'un siège TGV INOUI ou OUIGO.",
    url: `${SITE_URL}/comment-savoir`,
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
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-6 sm:pt-14">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            Comment savoir le sens de la marche d&apos;un TGV
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
            Deux données déterminent l&apos;orientation d&apos;un siège&nbsp;: la position du
            siège dans sa voiture, lue sur le plan, et le côté où se trouve la voiture 1 le jour
            du départ. Voici comment les réunir, ou utilisez directement l&apos;outil ci-dessous.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-6">
          <AnswerBox question="Comment savoir si un siège TGV est dans le sens de la marche ?">
            Il faut réunir deux données indépendantes. La première est sur le billet&nbsp;: le
            numéro de voiture et de place donnent l&apos;orientation du siège par rapport à la
            voiture 1, lue sur le plan d&apos;aménagement du type de rame. La seconde
            n&apos;existe qu&apos;au départ&nbsp;: le côté où se trouve la voiture 1, qui
            s&apos;observe sur l&apos;afficheur du quai. Si la voiture 1 est côté gare
            d&apos;arrivée, les places tournées vers elle sont dans le sens de la marche.
            L&apos;outil ci-dessous donne la première et énonce la règle pour la seconde.
          </AnswerBox>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-10">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <SeatFinder />
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            1. Le côté où se trouve la voiture 1
          </h2>
          <p className="text-[15px] leading-relaxed text-neutral-700">
            C&apos;est la seule vraie inconnue, et elle n&apos;est pas dans le plan. La voiture 1
            occupe toujours la même extrémité physique de la rame, mais une rame Duplex peut
            circuler dans les deux sens&nbsp;: rien, à la réservation, ne dit si elle sera côté
            gare de départ ou côté gare d&apos;arrivée. L&apos;hypothèse «&nbsp;voiture 1 toujours
            côté province&nbsp;» est une convention, pas une donnée, et la SNCF ne la garantit
            pas. Le jour du départ, l&apos;afficheur du quai donne l&apos;ordre réel des voitures.
          </p>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
              2. Le numéro de voiture dans sa rame
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Les voitures paires et impaires ne sont pas en miroir&nbsp;: sur les plans relevés,
              les voitures 2 et 3 sont identiques, tout comme 5, 6 et 7. Ce qui compte, c&apos;est
              le numéro de voiture <em>dans sa rame</em>&nbsp;: en unité multiple (deux rames
              accrochées, 1-8 puis 11-18), les voitures 11 à 18 reprennent le plan des voitures 1
              à 8.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            3. La position du siège dans la voiture
          </h2>
          <p className="text-[15px] leading-relaxed text-neutral-700">
            Elle ne se déduit pas d&apos;un calcul. Sur un plan réel, l&apos;orientation des
            sièges change par blocs de tailles inégales et se casse autour des portes, des
            escaliers, du bar et des salons d&apos;extrémité&nbsp;: la règle «&nbsp;un carré sur
            deux&nbsp;» de l&apos;outil d&apos;origine ne correspond à aucun plan. Chaque place est
            donc relevée séparément, voiture par voiture.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
            Les numéros à 3 chiffres (ex&nbsp;: 258, 904) sont la norme depuis décembre 2025&nbsp;:
            le premier chiffre est le chiffre des unités de la voiture. Place 258 = voiture 2 (ou
            12), place 58. L&apos;outil retire le préfixe et signale s&apos;il ne correspond pas à
            la voiture saisie.
          </p>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
              Astuce&nbsp;: vérifier directement sur le quai
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Sur la majorité des quais français, un écran affiche l&apos;ordre des voitures avant
              l&apos;arrivée du train. Les voitures de 1ère classe sont généralement à une
              extrémité. Une fois dans le train, la position du siège conducteur (visible par la
              baie arrondie) indique l&apos;avant de la rame.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Script id="jsonld-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <Script id="jsonld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
