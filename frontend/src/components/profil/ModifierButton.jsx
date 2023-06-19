import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Fab } from "@mui/material";

function ModifierButton() {
  return (
    <Fab className="h-10 w-10 bg-primary-900 flex items-center justify-center relative">
      <div className="flex items-center justify-center">
        <PencilSquareIcon className="text-white h-6 w-6" />
      </div>
    </Fab>
  );
}

export default ModifierButton;
