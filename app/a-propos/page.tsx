import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { REPO_URL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos : méthodologie et indépendance",
  description:
    "Qui sommes-nous, comment l'outil calcule l'orientation des sièges TGV, et pourquoi ce projet est indépendant de la SNCF.",
  alternates: { canonical: "/a-propos" },
  openGraph: { title: "À propos de Sens de la marche", url: "/a-propos", type: "article" },
};

const UPDATED = "2026-04-12";

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de Sens de la marche",
    url: `${SITE_URL}/a-propos`,
    inLanguage: "fr-FR",
    dateModified: UPDATED,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "À propos", item: `${SITE_URL}/a-propos` },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <header className="mb-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
              À propos de Sens de la marche
            </h1>
            <p className="mt-3 text-[13px] text-neutral-500">Mis à jour le {UPDATED}</p>
          </header>

          <section className="mb-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
            <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-neutral-500">
              Réponse courte
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-800">
              Sens de la marche est un projet indépendant qui propose un outil gratuit de
              vérification de l&apos;orientation des sièges TGV (INOUI et OUIGO, rames Duplex).
              Le calcul est effectué localement dans le navigateur. C&apos;est une prévision, avec
              un niveau de confiance affiché, pas une garantie.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">Mission</h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Donner à n&apos;importe quel voyageur une réponse claire et immédiate à la
              question «&nbsp;mon siège sera-t-il dans le sens de la marche&nbsp;?&nbsp;», sans
              compte, sans publicité, sans tracking. L&apos;outil s&apos;adresse en particulier
              aux personnes sensibles au mal des transports.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">Méthodologie</h2>
            <p className="mb-3 text-[15px] leading-relaxed text-neutral-700">
              Le résultat combine deux informations indépendantes&nbsp;:
            </p>
            <ol className="ml-5 list-decimal space-y-2 text-[15px] leading-relaxed text-neutral-700">
              <li>
                <strong>L&apos;orientation de la place par rapport à la voiture 1.</strong> Elle vient
                de plans d&apos;aménagement lus place par place (pour l&apos;instant TGV Duplex 2N,
                Euroduplex, Duplex 1re génération et OUIGO) et des observations terrain. Une place absente
                des plans donne «&nbsp;inconnu&nbsp;».
              </li>
              <li>
                <strong>Le côté où se trouvera la voiture 1.</strong> Une rame TGV peut circuler
                dans un sens ou dans l&apos;autre, donc il n&apos;est pas connu à la réservation.
                L&apos;outil ne le prévoit qu&apos;à partir des observations d&apos;un même numéro de
                train.
              </li>
            </ol>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
              L&apos;outil affiche aussi la réponse conditionnelle&nbsp;: «&nbsp;si la voiture 1 est
              côté X, ta place est dans le sens de la marche&nbsp;». Le jour du départ, la
              composition affichée sur le quai ou dans SNCF Connect permet de trancher.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Précision et limitations
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Au moment de la réservation, le sens réel de la rame n&apos;est connu de personne en
              dehors de la SNCF, et il peut être inversé le jour même. La confiance affichée est
              donc souvent faible tant que peu d&apos;observations ont été collectées. Le plan de
              voiture affiché sur le quai ou sur SNCF Connect fait foi. Les trajets
              Intercités, TER et internationaux hors TGV ne sont pas couverts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Indépendance
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Sens de la marche est un projet indépendant. Il n&apos;est ni affilié, ni
              parrainé, ni endossé par la SNCF, la SNCF Voyageurs, TGV INOUI ou OUIGO. Les noms
              et logos de ces marques restent la propriété de leurs détenteurs respectifs et ne
              sont mentionnés qu&apos;à titre descriptif.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Données personnelles
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              L&apos;intégralité du calcul est effectuée dans votre navigateur. Aucune donnée
              de trajet, de voiture ou de place n&apos;est transmise à un serveur. Le site ne
              dépose pas de cookies et n&apos;utilise aucun service de tracking.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Open source
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Le code source est publié sur GitHub&nbsp;:{" "}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                {REPO_URL.replace("https://github.com/", "github.com/")}
              </a>
              . C&apos;est un fork de{" "}
              <a
                href="https://github.com/tonoid/sensdelamarche"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                sensdelamarche
              </a>
              , créé par{" "}
              <a
                href="https://tonoid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                tonoid.com
              </a>
              &nbsp;: la reprise porte sur le modèle d&apos;orientation (plans relevés place par
              place, observations terrain) et sur la suppression du script de mesure
              d&apos;audience. Les signalements, les corrections de plans et les observations de
              train passent par les issues de ce dépôt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900">
              Citation et réutilisation
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Le contenu textuel peut être cité librement avec attribution à{" "}
              <strong>{SITE_URL.replace(/^https?:\/\//, "")}</strong>. Une version structurée lisible par les LLM
              est disponible à{" "}
              <a
                href="/llms.txt"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                /llms.txt
              </a>{" "}
              et{" "}
              <a
                href="/llms-full.txt"
                className="text-[#E5007D] underline underline-offset-2 hover:text-[#6E1E78]"
              >
                /llms-full.txt
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
      <Script id="jsonld-about" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id="jsonld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
