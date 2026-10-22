import Script from "next/script";
import Link from "next/link";
import SeatFinder from "./components/SeatFinder";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { AnswerBox } from "./components/AnswerBox";

const FAQ = [
  {
    q: "Comment savoir si mon siège TGV est dans le sens de la marche ?",
    a: "Entrez votre gare de départ, votre gare d'arrivée, le numéro de voiture et le numéro de place. L'outil indique immédiatement si vous voyagez face à la marche ou dos à la marche.",
  },
  {
    q: "Le calcul est-il fiable à 100 % ?",
    a: "Non. Au moment de la réservation, personne ne connaît le sens réel de la rame : il peut être inversé. L'outil indique l'orientation de ta place par rapport à la voiture 1 (d'après des plans d'aménagement), donc la réponse à appliquer le jour J selon le côté où se trouve la voiture 1. Il ne prévoit le sens de la rame que si ce train a déjà été observé.",
  },
  {
    q: "Ça marche pour OUIGO et TGV INOUI ?",
    a: "Oui. Les deux utilisent la même plateforme TGV Duplex, donc la logique d'orientation est identique. Sélectionnez simplement OUIGO ou INOUI en haut de l'outil.",
  },
  {
    q: "Et les places de 1ère classe ?",
    a: "Oui pour les TGV Duplex 2N, Euroduplex et Duplex 1re génération, dont les plans de 1re classe ont été relevés. Sur les rames Océane, les sièges de 1re pivotent au terminus pour faire face au sens de la marche (sauf en bout de voiture).",
  },
  {
    q: "Pourquoi certains trajets ne sont pas reconnus ?",
    a: "Nous couvrons les principaux axes TGV français. Si votre trajet emprunte un axe moins fréquent (Intercités, TER), le calcul ne s'applique pas.",
  },
];

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sens de la marche TGV",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description:
      "Outil gratuit pour vérifier si un siège TGV (INOUI ou OUIGO) est dans le sens de la marche.",
    inLanguage: "fr-FR",
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
                  Outil TGV gratuit
                </p>
                <h1 className="text-[28px] font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                  Mon siège TGV est-il dans le sens de la marche&nbsp;?
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]">
                  Vérifiez en 10 secondes l&apos;orientation de votre place sur un TGV INOUI ou
                  OUIGO. Entrez votre trajet, votre voiture et votre numéro de place, le résultat
                  s&apos;affiche immédiatement.
                </p>
                <ul className="mt-5 space-y-2 text-[13px] text-neutral-700 sm:mt-6 sm:text-[14px]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E5007D]" />
                    Compatible OUIGO et TGV INOUI (TGV Duplex)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E5007D]" />
                    Tous les grands axes français couverts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E5007D]" />
                    Gratuit, sans inscription, sans tracking
                  </li>
                </ul>
              </div>
              <div className="order-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:order-2">
                <SeatFinder />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pt-10">
          <AnswerBox question="Comment savoir si mon siège TGV est dans le sens de la marche ?">
            L&apos;orientation d&apos;une place TGV (INOUI ou OUIGO, rames Duplex) se détermine
            avec quatre informations&nbsp;: le trajet (gares de départ et d&apos;arrivée), le
            numéro de voiture (pair ou impair), le numéro de place et l&apos;étage (salle
            basse pour les places 1 à 39, salle haute à partir de 40). Les sièges sont
            disposés par groupes de 4 en face-à-face, avec une alternance qui s&apos;inverse
            entre voitures paires et impaires, et entre salle basse et salle haute.
          </AnswerBox>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
            Pourquoi connaître le sens de la marche sur un TGV
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              Voyager dos à la marche peut gâcher un long trajet, surtout pour les personnes
              sensibles au mal des transports. Sur un TGV Duplex (la majorité des rames INOUI et
              OUIGO), les sièges sont disposés par groupes de 4 en face-à-face, ce qui veut dire que
              la moitié des places voyagent forcément dos à la marche. Savoir à l&apos;avance de
              quel côté vous serez permet de choisir sereinement lors de la réservation.
            </p>
            <p>
              L&apos;orientation d&apos;une place dépend de trois choses&nbsp;: le trajet (dans quel
              sens roule le train), la voiture (numéro pair ou impair), et le numéro de siège
              (groupe de 4 auquel il appartient, salle basse ou haute). Notre outil combine ces
              trois paramètres pour donner une réponse immédiate.
            </p>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-900">
              Comment ça marche
            </h2>
            <ol className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
              <li>
                <strong className="text-neutral-900">1. Choisissez le type de train.</strong>{" "}
                OUIGO ou TGV INOUI, même logique, couleur différente dans l&apos;outil.
              </li>
              <li>
                <strong className="text-neutral-900">2. Indiquez le trajet.</strong> Gare de départ
                et gare d&apos;arrivée. L&apos;outil détecte l&apos;axe TGV emprunté.
              </li>
              <li>
                <strong className="text-neutral-900">3. Sélectionnez votre voiture.</strong> Elle
                est indiquée sur votre billet (ex&nbsp;: voiture&nbsp;3). Si le train est en unité
                multiple (UM, deux rames accrochées), choisissez la bonne rame.
              </li>
              <li>
                <strong className="text-neutral-900">4. Entrez votre numéro de place.</strong>{" "}
                Numéro à 2 chiffres (ex&nbsp;: 05) ou 3 chiffres (ex&nbsp;: 205). L&apos;outil
                gère les deux formats et détecte automatiquement la salle basse ou la salle haute.
              </li>
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-900">Questions fréquentes</h2>
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

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900">
              Ressources associées
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/tgv-inoui" className="block rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-neutral-400">
                <div className="text-[15px] font-semibold text-neutral-900">TGV INOUI</div>
                <div className="mt-1 text-[13px] text-neutral-500">Orientation des sièges sur les TGV INOUI</div>
              </Link>
              <Link href="/tgv-ouigo" className="block rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-neutral-400">
                <div className="text-[15px] font-semibold text-neutral-900">OUIGO</div>
                <div className="mt-1 text-[13px] text-neutral-500">Sens de la marche sur les trains OUIGO</div>
              </Link>
              <Link href="/comment-savoir" className="block rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-neutral-400">
                <div className="text-[15px] font-semibold text-neutral-900">Comment savoir</div>
                <div className="mt-1 text-[13px] text-neutral-500">Guide complet pour déterminer le sens de la marche</div>
              </Link>
              <Link href="/voiture-1" className="block rounded-lg border border-neutral-200 bg-white p-4 transition hover:border-neutral-400">
                <div className="text-[15px] font-semibold text-neutral-900">Voiture 1</div>
                <div className="mt-1 text-[13px] text-neutral-500">Sièges face à la marche en voiture 1</div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Script
        id="jsonld-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
