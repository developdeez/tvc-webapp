import gql from "graphql-tag";

/* Subscriptions */
export const MESSAGE_ACTION_SUB = gql`
  subscription {
    newMetricsSubsubscribe {
      id
      name
      properties {
        name
        link
        lastEngagement {
          id
          retweets
          likes
          comments
          views
        }
      }
    }
  }
`;

/* Queries */
export const GET_DASHBOARD_METRICS = gql`
  query {
    getDashboardMetrics {
      id
      name
      properties {
        name
        link
        lastEngagement {
          id
          retweets
          likes
          comments
          views
        }
      }
    }
  }
`;
