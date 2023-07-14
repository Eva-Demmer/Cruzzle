import { useContext } from "react";
import { Button } from "@mui/material";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";

export default function FilterBtnAdvanceSearchFavorites() {
  const { filterPanelIsOpen, setFilterPanelIsOpen } = useContext(
    FilterFavoritesContext
  );

  const handleClick = () => {
    setFilterPanelIsOpen(!filterPanelIsOpen);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      className="h-10 font-normal text-base normal-case rounded-full min-w-[148px]"
      onClick={handleClick}
    >
      <FunnelIcon className="w-4 mr-2" />
      More filters
    </Button>
  );
}
