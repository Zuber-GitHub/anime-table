import { gql } from "@apollo/client";

export const getAnimeListQuery = gql`
  query GetAnimeList($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media {
        id
        title {
          english
        }
        episodes
        status
        averageScore
        description
        startDate {
          year
        }
      }
    }
  }
`;

// id
// title {
//   romaji
//   english
//   native
// }
// episodes
// status pp
// averageScore pp
// description
// number of seasons
// startYear pp
// }
