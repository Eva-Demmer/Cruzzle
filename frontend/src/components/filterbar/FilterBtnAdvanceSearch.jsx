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
      sx={{ minWidth: 145, fontSize: "16px" }}
      variant="outlined"
      color="primary"
      className="w-22 h-10 normal-case rounded-full"
      onClick={handleClick}
    >
      <FunnelIcon className="w-4 mr-2" />
      More filters
    </Button>
  );
}
