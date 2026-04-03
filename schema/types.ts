// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeEpisode {
  id: string;
  audioUrl: string;
  body: { value: string; summary?: string };
  duration: string;
  episodeNumber: number;
  featured: boolean;
  guestName: string;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  publishDate: { time: string };
  season: number;
  title: string;
}

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  title: string;
}

export interface NodeHost {
  id: string;
  body: { value: string; summary?: string };
  email: string;
  path: string;
  photo: { url: string; alt: string; width: number; height: number };
  role: string;
  socialUrl: string;
  title: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}
