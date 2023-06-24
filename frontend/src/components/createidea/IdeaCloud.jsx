import { TextField } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaCloud() {
  const { control } = useContext(IdeaFormContext);

  return (
    <div className="my-8" aria-label="Cloud share">
      <h2 className="text-xl sm:text-2xl font-bold my-4">Cloud share</h2>
      <Controller
        name="cloudshare"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            id="cloudshare"
            label="Cloud"
            placeholder="Dropbox, Google drive..."
            className="w-full sm:w-[720px] my-2"
            InputLabelProps={{ shrink: true }}
            defaultValue={value}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}
export default IdeaCloud;
