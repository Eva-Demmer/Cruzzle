/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { Tabs, Tab, Box, Alert, AlertTitle } from "@mui/material";
import PropTypes from "prop-types";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function IdeaTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="my-8" aria-label="Context">
      <h2 className="text-2xl font-bold my-4">Context</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Goal" {...a11yProps(0)} />
            <Tab label="Benefits" {...a11yProps(1)} />
            <Tab label="Risks" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <li>
              Clearly define the main objective you want to achieve with your
              idea. This will help you stay focused and guide your actions
              throughout the process.
            </li>
            <li>
              Think about the specific goal you want to accomplish with your
              idea. A well-defined goal will allow you to measure your progress
              and stay focused on the expected outcomes.
            </li>
          </Alert>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <li>
              Identify the advantages and benefits that your idea can bring.
              This will help you understand the positive impact it could have
              and effectively communicate its benefits to others.
            </li>
            <li>
              Consider the concrete benefits that your idea can offer. By
              highlighting these advantages, you can convince others of its
              importance and value.
            </li>
          </Alert>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <li>
              Identify potential risks associated with your idea. By recognizing
              these risks early on, you will be better prepared to anticipate
              and mitigate them, minimizing potential obstacles.
            </li>
            <li>
              Examine the potential risks that could jeopardize the success of
              your idea. By identifying them and developing mitigation
              strategies, you will increase your chances of success.
            </li>
          </Alert>
        </TabPanel>
      </Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  other: PropTypes.shape({}),
};

TabPanel.defaultProps = {
  other: {},
};
