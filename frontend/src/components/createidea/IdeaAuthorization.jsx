import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";

function IdeaAuthorization() {
  const [isPrivateValue, setIsPrivateValue] = useState(0);

  const handleChangePrivateValue = (event) => {
    setIsPrivateValue(event.target.value);
  };

  return (
    <div className="my-8" aria-label="Authorization">
      <h2 className="text-2xl font-bold my-4">Authorization</h2>
      <FormLabel id="private-radio">Private</FormLabel>
      <RadioGroup
        aria-labelledby="private-radio"
        name="controlled-radio-buttons-group"
        row
        value={isPrivateValue}
        onChange={handleChangePrivateValue}
      >
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No" />
      </RadioGroup>
    </div>
  );
}
export default IdeaAuthorization;
