import { Tab, Tabs, Box } from "@mui/material";
import { useContext, useState } from "react";

import AllyProps from "../tabs/AllyProps";
import TabGeneral from "./Tabs/TabGeneral";
import TabFiles from "./Tabs/TabFiles";
import TabComments from "./Tabs/TabComments";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";

function TabsIdeaPage() {
  const [tabValue, setTabValue] = useState(0);
  const { idea } = useContext(IdeaPageContext);

  const tabsContent = ["General", "Files", `Comments (${idea.comment.length})`];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="w-full md:my-8 lg:mx-6" aria-label="Tabs">
      <Box className="my-4 lg:w-3/4">
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
