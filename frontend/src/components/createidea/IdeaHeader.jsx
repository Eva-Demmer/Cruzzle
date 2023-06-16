/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { TextField, Button, Autocomplete } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";

import CustomChip from "../styledComponents/CustomChip";

import addPicture from "../../assets/idea/addpicture.svg";

const ideaCategories = [
  {
    id: 1,
    category: "Technology",
    color: "rgba(0, 123, 255, 0.87)",
    value: "Technology",
  },
  {
    id: 2,
    category: "Art and Design",
    color: "rgba(255, 45, 85, 0.87)",
    value: "Art and Design",
  },
  {
    id: 3,
    category: "Science",
    color: "rgba(100, 210, 30, 0.87)",
    value: "Science",
  },
  {
    id: 4,
    category: "Health and Wellness",
    color: "rgba(175, 82, 222, 0.87)",
    value: "Health and Wellness",
  },
  {
    id: 5,
    category: "Education",
    color: "rgba(255, 149, 0, 0.87)",
    value: "Education",
  },
  {
    id: 6,
    category: "Environment",
    color: "rgba(0, 200, 83, 0.87)",
    value: "Environment",
  },
  {
    id: 7,
    category: "Business and Finance",
    color: "rgba(52, 199, 89, 0.87)",
    value: "Business and Finance",
  },
  {
    id: 8,
    category: "Entertainment",
    color: "rgba(255, 59, 48, 0.87)",
    value: "Entertainment",
  },
  {
    id: 9,
    category: "Social Impact",
    color: "rgba(90, 200, 250, 0.87)",
    value: "Social Impact",
  },
  {
    id: 10,
    category: "Sports and Recreation",
    color: "rgba(88, 86, 214, 0.87)",
    value: "Sports and Recreation",
  },
];

function IdeaHeader() {
  const [categoriesApi, setCategoriesApi] = useState([]);

  useEffect(() => {
    // TODO: Call API for categories
    setCategoriesApi(ideaCategories);
  }, []);

  return (
    <div className="my-8" aria-label="Header">
      <h2 className="text-2xl font-bold my-4">Header</h2>
      <TextField
        required
        id="titleIdea"
        label="Title"
        placeholder="Title of idea"
        className="w-[720px] my-2"
        InputLabelProps={{ shrink: true }}
      />
      <div className="flex my-6">
        <img src={addPicture} alt="standard" />
        <div className="flex flex-col justify-center items-center mx-6">
          <Button
            variant="contained"
            color="secondary"
            className="rounded-full mx-2 my-2 min-w-[174px]"
            sx={{
              boxShadow: 1,
              "&:hover": { boxShadow: 2 },
              "&:active, &.Mui-focusVisible": { boxShadow: 4 },
            }}
          >
            ADD
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<TrashIcon className="h-6 w-6" />}
            className="rounded-full mx-2 my-2 min-w-[174px]"
          >
            DELETE
          </Button>
        </div>
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Introduction"
        required
        multiline
        rows={4}
        placeholder="Leave a few words"
        className="w-[720px] my-4"
        InputLabelProps={{ shrink: true }}
      />
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={categoriesApi}
        disableCloseOnSelect
        getOptionLabel={(option) => option.category}
        className="w-[720px] my-4"
        disablePortal
        renderInput={(params) => (
          <TextField
            {...params}
            id="titleIdea"
            label="Categories"
            placeholder="Select category or categories"
            InputLabelProps={{ shrink: true }}
            required
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <CustomChip
              label={option.category}
              colorchoice={option.color}
              {...getTagProps({ index })}
            />
          ))
        }
      />
    </div>
  );
}
export default IdeaHeader;
