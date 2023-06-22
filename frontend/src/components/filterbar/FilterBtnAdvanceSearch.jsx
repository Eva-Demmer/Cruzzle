import { useContext } from "react";
import { Button } from "@mui/material";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterBtnPanelanceSearch() {
  const { filterPanelIsOpen, setFilterPanelIsOpen } = useContext(FilterContext);

  const handleClick = () => {
    setFilterPanelIsOpen(!filterPanelIsOpen);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      className="w-36 h-10 text-base normal-case rounded-full"
      onClick={handleClick}
    >
      <FunnelIcon className="w-4 mr-2" />
      More filters
    </Button>
  );
}
