import { Tab, Tabs, Box } from "@mui/material";
import { useState } from "react";

import AllyProps from "../tabs/AllyProps";
import TabGeneral from "./Tabs/TabGeneral";
import TabFiles from "./Tabs/TabFiles";
import TabComments from "./Tabs/TabComments";

function TabsIdeaPage() {
  const [tabValue, setTabValue] = useState(0);

  const tabsContent = ["General", "Files", "Comments"];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="my-8 mx-6" aria-label="Tabs">
      <Box className="my-4 w-3/4">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabsContent.map((tab, index) => (
              <Tab
                label={tab}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...AllyProps(index)}
                key={`${tab}`}
              />
            ))}
          </Tabs>
        </Box>
        {/* Insert CONTENT HERE */}
        <TabGeneral tabValue={tabValue} setTabValue={setTabValue} index={0} />
        <TabFiles tabValue={tabValue} index={1} />
        <TabComments tabValue={tabValue} index={2} />
      </Box>
    </div>
  );
}
export default TabsIdeaPage;
