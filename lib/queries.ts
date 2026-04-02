// Tagged template that returns the query string
const gql = (strings: TemplateStringsArray, ...values: any[]) => strings.reduce((a, s, i) => a + s + (values[i] || ''), '')

export const GET_EPISODE_TEASERS = gql`
  query GetEpisodeTeasers($first: Int = 50) {
    nodeEpisodes(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        changed {
          timestamp
        }
        ... on NodeEpisode {
          body {
            processed
            summary
          }
          episodeNumber
          season
          duration
          audioUrl
          guestName
          publishDate
          image {
            url
            alt
            width
            height
          }
          featured
        }
      }
    }
  }
`

export const GET_HOST_LIST = gql`
  query GetHostList($first: Int = 20) {
    nodeHosts(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        changed {
          timestamp
        }
        ... on NodeHost {
          body {
            processed
          }
          role
          email
          photo {
            url
            alt
            width
            height
          }
          socialUrl
        }
      }
    }
  }
`

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeEpisode {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
              summary
            }
            episodeNumber
            season
            duration
            audioUrl
            guestName
            publishDate
            image {
              url
              alt
              width
              height
            }
            featured
          }
          ... on NodeHost {
            id
            title
            path
            body {
              processed
            }
            role
            email
            photo {
              url
              alt
              width
              height
            }
            socialUrl
          }
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`
