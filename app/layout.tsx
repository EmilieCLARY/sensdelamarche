import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://sensdelamarche.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sens de la marche TGV : vérifier l'orientation de mon siège",
    template: "%s · Sens de la marche",
  },
  description:
    "Savoir en 10 secondes si ma place TGV (INOUI ou OUIGO) est dans le sens de la marche ou dos à la marche. Outil gratuit, sans inscription.",
  keywords: [
    "sens de la marche tgv",
    "siège tgv sens marche",
    "tgv inoui sens de la marche",
    "ouigo sens de la marche",
    "voiture 1 tgv",
    "comment savoir sens marche tgv",
  ],
  authors: [{ name: "Sens de la marche" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Sens de la marche",
    title: "Sens de la marche TGV : vérifier l'orientation de mon siège",
    description:
      "Outil gratuit pour savoir si votre siège TGV est dans le sens de la marche, avant ou pendant le trajet.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sens de la marche TGV",
    description: "Vérifier si mon siège TGV est dans le sens de la marche.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Sens de la marche",
    url: SITE_URL,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Sens de la marche",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      "Projet indépendant proposant un outil gratuit de vérification de l'orientation des sièges TGV INOUI et OUIGO.",
    foundingDate: "2026",
    areaServed: "FR",
    knowsLanguage: ["fr"],
    sameAs: ["https://github.com/tonoid/sensdelamarche", "https://tonoid.com"],
  };

  return (
    <html lang="fr" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-neutral-900">
        {children}
        <Script
          id="jsonld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
