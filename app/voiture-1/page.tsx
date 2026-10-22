import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";
import { SITE_URL } from "@/lib/site";

const UPDATED = "2026-04-12";

export const metadata: Metadata = {
  title: "Voiture 1 TGV : sens de la marche et orientation des sièges",
  description:
    "Voiture 1 d'un TGV : quels sièges regardent vers la voiture 1, d'après les plans relevés place par place, et la règle à appliquer le jour du départ.",
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Voiture 1", item: `${SITE_URL}/voiture-1` },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Voiture 1 TGV : sens de la marche",
    description: "Orientation des sièges en voiture 1 d'un TGV selon le trajet.",
    url: `${SITE_URL}/voiture-1`,
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
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 sm:text-[12px]">
                  Voiture 1
                </p>
                <h1 className="text-[28px] font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
                  Voiture 1 TGV : quels sièges sont dans le sens de la marche&nbsp;?
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                  La voiture 1 occupe toujours la même extrémité physique de la rame, mais rien ne
                  dit de quel côté du quai elle se trouvera le jour du départ&nbsp;: une rame Duplex
                  peut circuler dans les deux sens. L&apos;outil indique l&apos;orientation de
                  chaque place <em>par rapport à la voiture 1</em>, puis la règle à appliquer une
                  fois la voiture 1 repérée sur le quai.
                </p>
              </div>
              <div className="order-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:order-2">
                <SeatFinder />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pt-10">
          <AnswerBox question="La voiture 1 d'un TGV est-elle toujours dans le sens de la marche ?">
            Non, et personne ne peut le dire à la réservation. La voiture 1 occupe toujours la
            même extrémité physique de la rame (l&apos;extrémité V1), mais une rame Duplex peut
            circuler dans les deux sens&nbsp;: la SNCF ne garantit pas l&apos;ordre des voitures
            au moment de la réservation. Ce qui est stable, c&apos;est l&apos;orientation de
            chaque place par rapport à la voiture 1, relevée sur les plans d&apos;aménagement
            (Duplex 2N, Euroduplex, Duplex 1re génération, OUIGO densifié). Le jour du départ,
            repérez la voiture 1 sur l&apos;afficheur du quai&nbsp;: si elle est côté gare
            d&apos;arrivée, les places qui la regardent sont dans le sens de la marche.
          </AnswerBox>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            Ce que l&apos;outil sait, et ce qu&apos;il ne sait pas
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              La numérotation des voitures est fixée par rapport à la rame, pas par rapport au
              sens de circulation. L&apos;outil d&apos;origine supposait que l&apos;extrémité V1
              était toujours côté province sur un trajet au départ de Paris&nbsp;: c&apos;est une
              convention invérifiable, et une source fausse à la base de toutes les réponses.
            </p>
            <p>
              Le modèle actuel sépare donc deux questions. D&apos;abord l&apos;orientation de
              chaque place par rapport à la voiture 1, lue sur de vrais plans d&apos;aménagement
              place par place&nbsp;: c&apos;est une donnée stable, propre à chaque type de rame.
              Ensuite le côté où se trouve la voiture 1, qui n&apos;est prévu qu&apos;à partir
              d&apos;observations d&apos;un même numéro de train. Sans observation, l&apos;outil ne
              répond ni «&nbsp;sens&nbsp;» ni «&nbsp;dos&nbsp;»&nbsp;: il affiche la règle à
              appliquer le jour J.
            </p>
            <p>
              Cette règle tient en une phrase&nbsp;: repérez la voiture 1 (ou la 11 sur un train
              en unité multiple) sur l&apos;afficheur du quai. Si elle est côté gare
              d&apos;arrivée, les places orientées vers elle sont dans le sens de la marche&nbsp;;
              si elle est côté gare de départ, c&apos;est l&apos;inverse.
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
              supérieur, mais l&apos;orientation ne suit aucune règle d&apos;étage&nbsp;: elle est
              relevée place par place sur le plan. Les deux générations de Duplex divergent
              d&apos;ailleurs sur la salle basse de la voiture 1 (places 103, 110, 111, 112 et la
              place PMR 106), et l&apos;outil l&apos;indique au lieu de trancher. Sur OUIGO, la
              voiture 1 est en 2nde classe&nbsp;: il n&apos;y a pas de 1ère sur OUIGO.
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
