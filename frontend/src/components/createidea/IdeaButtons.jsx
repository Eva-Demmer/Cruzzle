import {
  ArrowUturnLeftIcon,
  CloudArrowUpIcon,
  ComputerDesktopIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function IdeaButtons() {
  const navigate = useNavigate();

  const location = useLocation();
  const isNewIdea = location.pathname === "/ideas/new";

  return (
    <div className="flex justify-center my-8">
      <Button
        variant="outlined"
        color="error"
        startIcon={<ArrowUturnLeftIcon className="h-6 w-6" />}
        className="flex rounded-full mx-2 min-w-[122px]"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      {isNewIdea && (
        <Button
          variant="contained"
          color="info"
          startIcon={<ComputerDesktopIcon className="h-6 w-6" />}
          className="flex rounded-full mx-2 min-w-[122px]"
          onClick={() => navigate("/ideas/new/preview")}
          sx={{
            boxShadow: 1,
            "&:hover": { boxShadow: 2 },
            "&:active, &.Mui-focusVisible": { boxShadow: 4 },
          }}
        >
          Preview
        </Button>
      )}
      <Button
        variant="contained"
        color={isNewIdea ? "primary" : "warning"}
        startIcon={
          isNewIdea ? (
            <CloudArrowUpIcon className="h-6 w-6" />
          ) : (
            <ServerIcon className="h-6 w-6" />
          )
        }
        type="submit"
        className="flex rounded-full mx-2 min-w-[122px]"
        sx={{
          boxShadow: 1,
          "&:hover": { boxShadow: 2 },
          "&:active, &.Mui-focusVisible": { boxShadow: 4 },
        }}
      >
        {isNewIdea ? "Publish" : "Save"}
      </Button>
    </div>
  );
}

export default IdeaButtons;
