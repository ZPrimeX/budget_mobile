import React from "react";
import { Box } from "native-base";
import Doughnut from "../components/dashboard/Doughnut";
import Graph from "../components/dashboard/Graph";

const Dashboard = () => {
  return (
    <Box style={{ height: "100%" }}>
      <Box>
        <Graph />
      </Box>
      <Box>
        <Doughnut />
      </Box>
    </Box>
  );
};

export default Dashboard;
