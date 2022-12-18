import React from "react";
import { Box } from "native-base";
import Doughnut from "../components/dashboard/Doughnut";
import Graph from "../components/dashboard/Graph";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <Box>
        <Graph />
      </Box>
      <Box>
        <Doughnut />
      </Box>
    </>
  );
};

export default Dashboard;
