import type { Metadata } from "next";
import Script from "next/script";
import SeatFinder from "../components/SeatFinder";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { AnswerBox } from "../components/AnswerBox";

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
    a: "OUIGO utilise des rames TGV Duplex, souvent d'anciennes rames rénovées avec une densité plus élevée (plus de sièges, moins d'espacement). La logique d'orientation est strictement identique à INOUI.",
  },
  {
    q: "Est-ce que OUIGO classique (grande vitesse) et OUIGO Train Classique ont la même logique ?",
    a: "Non. OUIGO Train Classique (ex-Intercités) n'utilise pas de TGV Duplex. Cet outil ne couvre que les OUIGO grande vitesse.",
  },
  {
    q: "Salle haute ou salle basse sur OUIGO : y a-t-il une différence ?",
    a: "La salle haute (places à partir de 40) offre plus de luminosité et une meilleure vue. La salle basse est plus calme et plus pratique pour l'accès au bagages. L'orientation alterne entre les deux étages : si vous êtes dos à la marche en salle basse place 05, vous seriez face à la marche en salle haute place 45 de la même voiture.",
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
      { "@type": "ListItem", position: 2, name: "OUIGO", item: "https://sensdelamarche.fr/tgv-ouigo" },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sens de la marche sur un OUIGO",
    description: "Orientation des sièges OUIGO (rames TGV Duplex).",
    url: "https://sensdelamarche.fr/tgv-ouigo",
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
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-[#E5007D]">
                  OUIGO
                </p>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                  Sens de la marche sur un OUIGO
                </h1>
                <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
                  Votre place OUIGO est-elle face à la marche ou dos à la marche&nbsp;? Entrez
                  votre trajet, la voiture et le numéro de siège, le résultat s&apos;affiche
                  immédiatement.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <SeatFinder defaultTrain="ouigo" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pt-10">
          <AnswerBox question="Comment savoir si mon siège OUIGO est dans le sens de la marche ?">
            OUIGO utilise les mêmes rames TGV Duplex que TGV INOUI, donc la logique
            d&apos;orientation est strictement identique. L&apos;orientation de votre place
            dépend du trajet, du numéro de voiture (pair ou impair), du numéro de place
            (groupe de 4) et de l&apos;étage (salle basse pour les places 1 à 39, salle haute
            à partir de 40). L&apos;outil ci-dessus calcule le résultat à partir de ces
            informations.
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
              La logique est la même que sur TGV INOUI&nbsp;: alternance par groupes de 4 sièges,
              inversion entre salle basse et salle haute, inversion entre voitures paires et
              impaires. Le sens de circulation du train (qui dépend du trajet) finit de déterminer
              l&apos;orientation.
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
