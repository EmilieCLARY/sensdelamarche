import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "FAQ : sens de la marche TGV",
  description:
    "Toutes les questions sur le sens de la marche en TGV : INOUI, OUIGO, voitures, salle basse/haute, 1ère classe, fiabilité de l'outil.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ Sens de la marche TGV", url: "/faq", type: "article" },
};

const FAQ = [
  {
    q: "Comment savoir si mon siège TGV est dans le sens de la marche ?",
    a: "Utilisez l'outil sur la page d'accueil : entrez votre trajet, la voiture et le numéro de place. Le résultat s'affiche en moins d'une seconde.",
  },
  {
    q: "L'outil fonctionne-t-il pour les TGV INOUI et OUIGO ?",
    a: "Oui. Les deux utilisent la même plateforme TGV Duplex, donc la logique d'orientation est identique.",
  },
  {
    q: "Le résultat est-il fiable à 100 % ?",
    a: "C'est une estimation basée sur le schéma TGV Duplex le plus courant. L'exactitude est élevée sur les rames Duplex standard, mais certaines rames (Euroduplex, Atlantique, Réseau) peuvent avoir des configurations légèrement différentes. Vérifiez toujours le plan de voiture affiché sur le quai ou sur SNCF Connect.",
  },
  {
    q: "Pourquoi mon trajet n'est-il pas reconnu ?",
    a: "L'outil couvre les principaux axes TGV français (Paris → province, intersecteurs, intra-axes). Les trajets Intercités, TER ou internationaux hors TGV ne sont pas traités.",
  },
  {
    q: "Quelle différence entre salle haute et salle basse sur un TGV Duplex ?",
    a: "Les TGV Duplex ont deux étages. La salle basse regroupe les places 01 à 39 environ ; la salle haute, à partir de 40. L'orientation des sièges est inversée entre les deux étages.",
  },
  {
    q: "Que signifie UM et US dans l'outil ?",
    a: "UM (Unité Multiple) = deux rames accrochées formant un seul train (voitures 1-8 puis 11-18). US (Unité Simple) = une seule rame (voitures 1-8). Le numéro de voiture sur votre billet vous dit laquelle vous choisir.",
  },
  {
    q: "Les carrés (sièges en face-à-face) sont-ils tous obligatoirement à moitié dos à la marche ?",
    a: "Oui. Dans un carré de 4 sièges face à face, deux personnes voyagent forcément dos à la marche. Si vous voyagez seul et souhaitez éviter cette disposition, choisissez une rangée non-carré (groupes de 2 côte-à-côte orientés dans le même sens).",
  },
  {
    q: "Comment choisir sa place dans le sens de la marche sur SNCF Connect ?",
    a: "Au moment de la sélection du siège, SNCF Connect affiche une petite flèche indiquant l'orientation. Sur Trainline la flèche est plus discrète. Notre outil vous permet de vérifier un siège déjà réservé.",
  },
  {
    q: "L'outil gère-t-il la 1ère classe ?",
    a: "Oui. La 1ère classe utilise la même règle d'alternance que la 2nde. Seul le confort du fauteuil et l'espacement changent.",
  },
  {
    q: "L'outil est-il gratuit ?",
    a: "Entièrement gratuit, sans inscription, sans publicité, sans tracking.",
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
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://sensdelamarche.fr/faq" },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-3xl px-4 pt-10 pb-8 sm:pt-14">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
            Questions fréquentes
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">
            Tout ce qu&apos;il faut savoir sur le sens de la marche en TGV INOUI et OUIGO.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-14">
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
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-neutral-900 px-6 text-[14px] font-semibold text-white transition hover:bg-neutral-800"
            >
              Utiliser l&apos;outil
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="jsonld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
