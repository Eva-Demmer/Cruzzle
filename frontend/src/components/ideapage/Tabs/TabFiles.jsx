import PropTypes from "prop-types";
import { useContext } from "react";
import TabPanel from "../../tabs/TabPanel";
import FilesDownload from "../FilesDownload";
import { IdeaPageContext } from "../../../contexts/IdeaPageContext";

function TabFiles({ tabValue, index }) {
  const { idea } = useContext(IdeaPageContext);

  return (
    <div>
      <TabPanel value={tabValue} index={index} className="w-full">
        {idea.attachment && idea.attachment.length > 0 && <FilesDownload />}
      </TabPanel>
    </div>
  );
}

TabFiles.propTypes = {
  tabValue: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default TabFiles;
