import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";
import { SITE_URL } from "@/lib/site";

const UPDATED = "2026-04-12";

export const metadata: Metadata = {
  title: "Sens de la marche OUIGO : vérifier l'orientation de sa place",
  description:
    "Outil gratuit pour savoir si votre place OUIGO est dans le sens de la marche ou dos à la marche. Toutes voitures, toutes rames Duplex.",
  alternates: { canonical: "/tgv-ouigo" },
  openGraph: {
    title: "Sens de la marche OUIGO",
    description: "Vérifier l'orientation de votre siège OUIGO avant le départ.",
    url: "/tgv-ouigo",
    type: "article",
  },
};

const FAQ = [
  {
    q: "Peut-on choisir sa place à l'avance sur OUIGO ?",
    a: "Oui, moyennant un supplément de quelques euros (option payante au moment de la réservation ou après). Sinon, OUIGO attribue une place aléatoirement à l'enregistrement.",
  },
  {
    q: "Les rames OUIGO sont-elles identiques aux rames INOUI ?",
    a: "Non, pas pour l'orientation. OUIGO utilise des Duplex densifiés, avec un plan et une numérotation propres : la place x40 est en salle basse sur OUIGO alors qu'elle est en salle haute sur INOUI, et les places latérales x45 et x46 des salles hautes existent chez OUIGO sans figurer sur les plans INOUI. L'outil applique donc le plan OUIGO quand vous choisissez OUIGO.",
  },
  {
    q: "Est-ce que OUIGO classique (grande vitesse) et OUIGO Train Classique ont la même logique ?",
    a: "Non. OUIGO Train Classique (ex-Intercités) n'utilise pas de TGV Duplex. Cet outil ne couvre que les OUIGO grande vitesse.",
  },
  {
    q: "Salle haute ou salle basse sur OUIGO : y a-t-il une différence ?",
    a: "La salle haute (places à partir de 41 sur OUIGO) offre plus de luminosité et une meilleure vue, la salle basse est plus pratique pour les bagages. En revanche, il n'y a pas d'inversion systématique entre les étages : chaque salle a ses propres ruptures (portes, escaliers, tables), et l'outil lit le plan place par place plutôt que d'appliquer une règle d'étage.",
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
      { "@type": "ListItem", position: 2, name: "OUIGO", item: `${SITE_URL}/tgv-ouigo` },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sens de la marche sur un OUIGO",
    description: "Orientation des sièges OUIGO (rames TGV Duplex).",
    url: `${SITE_URL}/tgv-ouigo`,
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
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#E5007D] sm:text-[12px]">
                  OUIGO
                </p>
                <h1 className="text-[28px] font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
                  Sens de la marche sur un OUIGO
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                  Votre place OUIGO est-elle face à la marche ou dos à la marche&nbsp;? Entrez
                  votre trajet, la voiture et le numéro de siège, le résultat s&apos;affiche
                  immédiatement.
                </p>
              </div>
              <div className="order-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:order-2">
                <SeatFinder defaultTrain="ouigo" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pt-10">
          <AnswerBox question="Comment savoir si mon siège OUIGO est dans le sens de la marche ?">
            OUIGO utilise des TGV Duplex densifiés, dont le plan et la numérotation diffèrent de
            ceux d&apos;INOUI&nbsp;: l&apos;outil applique donc le plan relevé sur
            l&apos;option «&nbsp;Choix de la place&nbsp;» d&apos;OUIGO. Il vous donne
            l&apos;orientation de votre place par rapport à la voiture 1, puis la règle à
            appliquer sur le quai&nbsp;: si la voiture 1 (ou la 11 sur un train en unité multiple)
            est côté gare d&apos;arrivée, les places tournées vers elle sont dans le sens de la
            marche.
          </AnswerBox>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            Savoir à l&apos;avance son sens de la marche sur OUIGO
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              Sur OUIGO, le choix de siège est payant. Si vous ne payez pas ce supplément, une
              place vous est attribuée à l&apos;enregistrement, sans possibilité de savoir à
              l&apos;avance si vous serez face ou dos à la marche. Pour les voyageurs sensibles au
              mal des transports, le supplément choix de siège est souvent rentable, à condition
              de savoir quelle place est face à la marche. Notre outil vous donne la réponse avant
              de valider votre choix.
            </p>
            <p>
              L&apos;orientation ne suit pas une règle arithmétique. Sur le plan relevé, elle change
              par blocs et se casse aux portes, aux escaliers et autour des tables&nbsp;: deux
              voitures voisines ne se déduisent pas l&apos;une de l&apos;autre, et les places
              latérales des salles hautes (x45, x46) restent hors relevé. L&apos;outil lit donc le
              plan place par place et s&apos;arrête quand il ne sait pas.
            </p>
          </div>
        </article>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-900">Questions fréquentes OUIGO</h2>
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
