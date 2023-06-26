import { Alert, AlertTitle, Tab, Tabs, Box, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Controller } from "react-hook-form";

import TabPanel from "../tabs/TabPanel";
import AllyProps from "../tabs/AllyProps";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaTabs() {
  const { control } = useContext(IdeaFormContext);
  const [tabValue, setTabValue] = useState(0);

  const tabsContent = [
    {
      title: "Info",
      label: "Goal",
      content: (
        <ul>
          <li>
            Clearly define the main objective you want to achieve with your
            idea. This will help you stay focused and guide your actions
            throughout the process.
          </li>
          <li>
            Think about the specific goal you want to accomplish with your idea.
            A well-defined goal will allow you to measure your progress and stay
            focused on the expected outcomes.
          </li>
        </ul>
      ),
    },
    {
      title: "Info",
      label: "Profits",
      content: (
        <ul>
          <li>
            Identify the advantages and benefits that your idea can bring. This
            will help you understand the positive impact it could have and
            effectively communicate its benefits to others.
          </li>
          <li>
            Consider the concrete benefits that your idea can offer. By
            highlighting these advantages, you can convince others of its
            importance and value.
          </li>
        </ul>
      ),
    },
    {
      title: "Info",
      label: "Risks",
      content: (
        <ul>
          <li>
            Identify potential risks associated with your idea. By recognizing
            these risks early on, you will be better prepared to anticipate and
            mitigate them, minimizing potential obstacles.
          </li>
          <li>
            Examine the potential risks that could jeopardize the success of
            your idea. By identifying them and developing mitigation strategies,
            you will increase your chances of success.
          </li>
        </ul>
      ),
    },
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="my-8" aria-label="Context">
      <h2 className="text-xl sm:text-2xl font-bold my-4">Content</h2>
      <Box className="my-4 w-full">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabsContent.map((tab, index) => (
              <Tab
                label={tab.label}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...AllyProps(index)}
                key={`${tab.label}Tab`}
              />
            ))}
          </Tabs>
        </Box>
        {tabsContent.map((tab, index) => (
          <TabPanel
            value={tabValue}
            index={index}
            className="w-full"
            key={tab.label}
          >
            <Alert severity="info" className="my-4">
              <AlertTitle>{tab.title}</AlertTitle>
              {tab.content}
            </Alert>
            <Controller
              name={tab.label.toLowerCase()}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  id={`${tab.label.toLowerCase()}Field`}
                  label={tab.label}
                  defaultValue={value}
                  onChange={onChange}
                  multiline
                  rows={6}
                  placeholder="Leave a few words"
                  className="w-full my-4"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
export default IdeaTabs;
