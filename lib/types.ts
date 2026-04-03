
export interface ImageVariation {
  name: string
  url: string
  width: number
  height: number
}

export interface DrupalImage {
  url: string
  alt: string
  width?: number
  height?: number
  variations?: ImageVariation[]
}

export interface DrupalNode {
  id: string
  title: string
  path: string
  created: {
    timestamp: number
  }
  changed: {
    timestamp: number
  }
}

export interface DrupalEpisode extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  episodeNumber?: number
  season?: number
  duration?: string
  audioUrl?: string
  guestName?: string
  publishDate?: { timestamp: number } | string
  image?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  featured?: boolean
}

export interface DrupalHost extends DrupalNode {
  body?: {
    processed: string
  }
  role?: string
  email?: string
  photo?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  socialUrl?: string
}

export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface EpisodeTeaserData {
  nodeEpisodes: {
    nodes: DrupalEpisode[]
  }
}

export interface HostListData {
  nodeHosts: {
    nodes: DrupalHost[]
  }
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}
