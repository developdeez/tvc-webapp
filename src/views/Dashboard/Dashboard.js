import React from "react";
import { useQuery } from "@apollo/react-hooks";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { GET_DASHBOARD_METRICS, MESSAGE_ACTION_SUB } from "../../queries";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const { subscribeToMore, loading, data } = useQuery(GET_DASHBOARD_METRICS);

  if (loading) return <p>Loading ...</p>;

  return (
    <div>
      <GridContainer>
        {data.getDashboardMetrics.map(company => {
          const tableData = company.properties.map(property => [
            "1/16",
            property.name,
            property.lastEngagement.views,
            property.lastEngagement.likes,
            property.lastEngagement.retweets,
            property.lastEngagement.comments,
            "N/A",
            property.link
          ]);

          return (
            <GridItem xs={12} sm={12} md={12} key={company.id}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{company.name}</h4>
                  <p className={classes.cardCategoryWhite}>
                    **Todo: add dynamic date- Total Engagement as of Feburary
                    19, 2020
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    subscribeToNewMetrics={() =>
                      subscribeToMore({
                        document: MESSAGE_ACTION_SUB,
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev;
                          const newFeedItem =
                            subscriptionData.data.newMetricsSubsubscribe;
                          return { getDashboardMetrics: newFeedItem };
                        }
                      })
                    }
                    tableHead={[
                      "Date",
                      "Name",
                      "Views",
                      "Likes",
                      "Retweets",
                      "Comments",
                      "Comment Posts",
                      "Link"
                    ]}
                    tableData={tableData}
                  />
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    </div>
  );
}
