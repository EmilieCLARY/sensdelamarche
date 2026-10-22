/**
 * Identité du site : une seule source pour l'URL publique et le dépôt.
 *
 * NEXT_PUBLIC_SITE_URL est renseignée par le workflow GitHub Pages
 * (voir .github/workflows/deploy.yml) et inclut le chemin de base quand le site
 * est servi sous /<dépôt> ; en local, on reste sur localhost. Sans ce réglage, un
 * fork déployé sur <compte>.github.io/<dépôt> déclarerait un canonical vers un
 * domaine qu'il ne contrôle pas.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

/** Dépôt du fork maintenu : les observations terrain doivent arriver ici. */
export const REPO_URL = "https://github.com/EmilieCLARY/sensdelamarche";
