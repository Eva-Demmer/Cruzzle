import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import TabPanel from "../../tabs/TabPanel";
import { IdeaPageContext } from "../../../contexts/IdeaPageContext";
import TopComments from "../TopComments";

function TabGeneral({ tabValue, setTabValue, index }) {
  const { idea } = useContext(IdeaPageContext);
  const [expanded, setExpanded] = useState(true);
  const { goal, risks, profits, comment } = idea;
  return (
    <div>
      <TabPanel value={tabValue} index={index} className="w-full">
        {goal && (
          <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <AccordionSummary
              expandIcon={<ChevronUpIcon className="h-6 w-6" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h3 className="text-xl ">Goal</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>{goal}</p>
            </AccordionDetails>
          </Accordion>
        )}
        {profits && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ChevronUpIcon className="h-6 w-6" />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h3 className="text-xl ">Profits</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>{profits}</p>
            </AccordionDetails>
          </Accordion>
        )}
        {risks && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ChevronUpIcon className="h-6 w-6" />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <h3 className="text-xl ">Risks</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>{risks}</p>
            </AccordionDetails>
          </Accordion>
        )}
        {comment.length > 0 && <TopComments setTabValue={setTabValue} />}
      </TabPanel>
    </div>
  );
}

TabGeneral.propTypes = {
  tabValue: PropTypes.number.isRequired,
  setTabValue: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default TabGeneral;
