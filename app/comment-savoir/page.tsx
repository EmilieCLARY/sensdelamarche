import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";

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
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sensdelamarche.fr" },
      { "@type": "ListItem", position: 2, name: "Comment savoir", item: "https://sensdelamarche.fr/comment-savoir" },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comment savoir le sens de la marche d'un TGV",
    description:
      "Guide complet pour déterminer l'orientation d'un siège TGV INOUI ou OUIGO.",
    url: "https://sensdelamarche.fr/comment-savoir",
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
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-6 sm:pt-14">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            Comment savoir le sens de la marche d&apos;un TGV
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
            Trois paramètres déterminent l&apos;orientation d&apos;un siège&nbsp;: le sens de
            circulation du train, le numéro de voiture, et la position du siège dans la voiture.
            Voici comment les combiner, ou utilisez directement l&apos;outil ci-dessous.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-6">
          <AnswerBox question="Comment savoir si un siège TGV est dans le sens de la marche ?">
            Il faut combiner quatre informations présentes sur le billet&nbsp;: les gares de
            départ et d&apos;arrivée (qui donnent le sens de circulation), le numéro de
            voiture, le numéro de place et l&apos;étage (salle basse jusqu&apos;à la place 39,
            salle haute à partir de 40). Les sièges sont disposés par groupes de 4 en
            face-à-face, avec une alternance qui s&apos;inverse entre voitures paires/impaires
            et entre salle basse/haute. L&apos;outil ci-dessous automatise le calcul.
          </AnswerBox>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-10">
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <SeatFinder />
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            1. Le sens de circulation du train
          </h2>
          <p className="text-[15px] leading-relaxed text-neutral-700">
            Chaque TGV a une orientation fixe&nbsp;: l&apos;extrémité avant de la rame (voiture 1
            ou voiture 18 selon l&apos;axe) pointe toujours vers un côté géographique. Par
            convention SNCF, <strong>V1</strong> désigne l&apos;extrémité tournée vers la province
            sur les axes radiaux (Paris → province) et vers le sud sur les axes sud-nord. Quand
            vous partez de Paris, V1 pointe à l&apos;avant du train. Quand vous revenez vers Paris,
            V1 pointe à l&apos;arrière. L&apos;orientation d&apos;un même siège s&apos;inverse
            donc selon le sens du trajet.
          </p>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
              2. Le numéro de voiture
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Les voitures paires et impaires ont leurs sièges disposés en miroir. Une même place
              05 n&apos;a pas la même orientation en voiture 2 et en voiture 3. En unité multiple
              (deux rames accrochées, numérotées 1-8 puis 11-18), la règle s&apos;applique au
              numéro de voiture <em>dans sa rame</em>.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            3. La position du siège dans la voiture
          </h2>
          <p className="text-[15px] leading-relaxed text-neutral-700">
            Les sièges sont installés par groupes de 4 en face-à-face. Places 01-04&nbsp;: deux
            orientés vers un côté, deux vers l&apos;autre. Places 05-08&nbsp;: inversé. Et ainsi
            de suite. Les places à partir de 40 sont en <strong>salle haute</strong> (étage
            supérieur des rames Duplex), avec une alternance inversée par rapport à la salle basse.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
            Les numéros à 3 chiffres (ex&nbsp;: 205, 312) incluent parfois un préfixe de voiture.
            L&apos;outil détecte ces formats automatiquement.
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
