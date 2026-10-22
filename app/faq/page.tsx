import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SITE_URL } from "@/lib/site";

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
    a: "Oui, mais avec deux plans distincts : les Duplex densifiés d'OUIGO n'ont pas la même numérotation que ceux d'INOUI (la place x40 est en salle basse chez OUIGO, en salle haute chez INOUI). Les rames Océane, Atlantique/Réseau et TGV M ne sont pas encore relevées : l'outil l'indique au lieu de deviner.",
  },
  {
    q: "Le résultat est-il fiable à 100 % ?",
    a: "Non. Au moment de la réservation, personne ne connaît le sens réel de la rame : il peut être inversé. L'outil indique l'orientation de ta place par rapport à la voiture 1 (d'après des plans d'aménagement), donc la réponse à appliquer le jour J selon le côté où se trouve la voiture 1. Il ne prévoit le sens de la rame que si ce train a déjà été observé.",
  },
  {
    q: "Pourquoi mon trajet n'est-il pas reconnu ?",
    a: "L'outil couvre les principaux axes TGV français (Paris → province, intersecteurs, intra-axes). Les trajets Intercités, TER ou internationaux hors TGV ne sont pas traités.",
  },
  {
    q: "Quelle différence entre salle haute et salle basse sur un TGV Duplex ?",
    a: "Ce sont les deux étages d'une rame Duplex. La salle basse va jusqu'à la place 39 (40 exclu sur OUIGO), la salle haute au-delà. Attention : les deux étages n'ont pas d'orientation systématiquement inversée. L'outil lit le plan place par place, salle par salle.",
  },
  {
    q: "Que signifie UM et US dans l'outil ?",
    a: "UM (Unité Multiple) = deux rames accrochées formant un seul train (voitures 1-8 puis 11-18). US (Unité Simple) = une seule rame (voitures 1-8). Le numéro de voiture sur votre billet vous dit laquelle vous choisir.",
  },
  {
    q: "Les carrés (sièges en face-à-face) sont-ils tous obligatoirement à moitié dos à la marche ?",
    a: "Dans un carré de quatre sièges face à face, deux voyageurs regardent dans un sens et deux dans l'autre. En revanche, il n'existe pas de « rangée non-carré » à choisir pour l'éviter : en Duplex 2nde classe, l'essentiel des places est en face-à-face, et les blocs de sièges ne s'alternent pas régulièrement. Le seul moyen fiable est de vérifier le plan de la place, voiture par voiture.",
  },
  {
    q: "Comment choisir sa place dans le sens de la marche sur SNCF Connect ?",
    a: "Au moment de la sélection du siège, SNCF Connect affiche une petite flèche indiquant l'orientation. Sur Trainline la flèche est plus discrète. Notre outil vous permet de vérifier un siège déjà réservé.",
  },
  {
    q: "L'outil gère-t-il la 1ère classe ?",
    a: "Oui pour les TGV Duplex 2N, Euroduplex et Duplex 1re génération, dont les plans de 1re classe ont été relevés. Sur les rames Océane, les sièges de 1re pivotent au terminus pour faire face au sens de la marche (sauf en bout de voiture).",
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
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
