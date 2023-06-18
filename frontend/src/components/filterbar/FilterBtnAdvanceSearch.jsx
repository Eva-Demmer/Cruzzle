import * as React from "react";
import { Button } from "@mui/material";

import { FunnelIcon } from "@heroicons/react/24/outline";

export default function FilterBtnAdvanceSearch() {
  return (
    <Button
      sx={{ minWidth: 145, fontSize: "16px" }}
      variant="outlined"
      color="primary"
      className="w-22 h-10 normal-case rounded-full"
    >
      <FunnelIcon className="w-4 mr-2" />
      More filters
    </Button>
  );
}
