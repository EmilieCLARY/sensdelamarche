import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";

const UPDATED = "2026-04-12";

export const metadata: Metadata = {
  title: "Voiture 1 TGV : sens de la marche et orientation des sièges",
  description:
    "Quels sièges sont dans le sens de la marche en voiture 1 d'un TGV (INOUI ou OUIGO) ? Outil gratuit avec résultat immédiat selon le trajet.",
  alternates: { canonical: "/voiture-1" },
  openGraph: {
    title: "Voiture 1 TGV : sens de la marche",
    description: "Orientation des sièges en voiture 1 d'un TGV.",
    url: "/voiture-1",
    type: "article",
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sensdelamarche.fr" },
      { "@type": "ListItem", position: 2, name: "Voiture 1", item: "https://sensdelamarche.fr/voiture-1" },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Voiture 1 TGV : sens de la marche",
    description: "Orientation des sièges en voiture 1 d'un TGV selon le trajet.",
    url: "https://sensdelamarche.fr/voiture-1",
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
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-neutral-500">
                  Voiture 1
                </p>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                  Voiture 1 TGV : quels sièges sont dans le sens de la marche&nbsp;?
                </h1>
                <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
                  La voiture 1 est à une extrémité du train. Son orientation dépend donc
                  directement du trajet&nbsp;: elle peut être à l&apos;avant de la rame (face à la
                  marche) ou à l&apos;arrière (dos à la marche) selon le sens de circulation.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <SeatFinder />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pt-10">
          <AnswerBox question="La voiture 1 d'un TGV est-elle toujours dans le sens de la marche ?">
            Non. La voiture 1 se trouve toujours à la même extrémité physique de la rame
            (côté V1), mais cette extrémité est à l&apos;avant du train sur un trajet Paris
            → province, et à l&apos;arrière sur le trajet retour. L&apos;orientation d&apos;une
            place en voiture 1 dépend donc directement du sens de circulation. Sur un TGV
            Duplex, la moitié des sièges de la voiture 1 est face à la marche, l&apos;autre
            moitié dos à la marche, avec inversion entre salle basse et salle haute.
          </AnswerBox>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            Pourquoi la voiture 1 change d&apos;orientation selon le trajet
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              La numérotation des voitures SNCF est fixée par rapport à la rame, pas par rapport au
              sens de circulation. La voiture 1 se trouve toujours à la même extrémité physique du
              train (l&apos;extrémité V1, généralement côté province ou sud selon l&apos;axe).
              Lorsque le train part de Paris vers la province, la voiture 1 est à
              l&apos;avant&nbsp;: les sièges orientés vers l&apos;avant sont dans le sens de la
              marche. Au retour, quand le train rentre vers Paris, la voiture 1 passe à
              l&apos;arrière&nbsp;: les mêmes sièges sont alors dos à la marche.
            </p>
            <p>
              C&apos;est pour ça qu&apos;une règle simple type «&nbsp;en voiture 1, les places 01
              à 04 sont face à la marche&nbsp;» est fausse&nbsp;: l&apos;orientation dépend
              systématiquement du trajet. L&apos;outil en haut de page intègre cette variable
              automatiquement.
            </p>
          </div>
        </article>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
              Voiture 1 et 1ère classe
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Sur la majorité des TGV INOUI, la voiture 1 est en 1ère classe. Le confort est
              supérieur mais la logique d&apos;orientation reste la même&nbsp;: alternance par
              groupes de 4, inversion salle basse/salle haute. Sur OUIGO, la voiture 1 est en 2nde
              classe (pas de 1ère sur OUIGO).
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="jsonld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  );
}
