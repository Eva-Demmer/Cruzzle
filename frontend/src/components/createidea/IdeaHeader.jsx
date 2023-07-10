/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect, useState } from "react";
import { TextField, Button, Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/24/outline";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

import formatBytes from "../../utils/formatBytes";

import CustomChip from "../styledComponents/CustomChip";
import UploadButton from "../styledComponents/UploadButton";

import addPicture from "../../assets/idea/addpicture.svg";
import { apiCategories } from "../../services/api.categories";

function IdeaHeader() {
  const [categoriesApi, setCategoriesApi] = useState([]);

  const {
    control,
    primaryImg,
    setPrimaryImg,
    setOpen,
    setErrorFiles,
    valueCategories,
    setValueCategories,
  } = useContext(IdeaFormContext);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchCategories = await apiCategories();
        if (fetchCategories) {
          const mappedCategories = fetchCategories.map((category) => ({
            id: category.id,
            label: category.label,
            color: category.color,
          }));
          setCategoriesApi(mappedCategories);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  const handleChangePrimaryPicture = (event) => {
    const { files } = event.target;
    const file = files[0];

    const maxSizeInKB = 4096; // Maximum size file in Kb
    const fileSizeInKB = file.size / 1024; // Convert to Kb

    const newErrorFiles = [];

    if (fileSizeInKB > maxSizeInKB) {
      newErrorFiles.push({
        id: 1,
        message: (
          <>
            The file <strong>{file.name}</strong> exceeds the maximum allowed
            size of {formatBytes(maxSizeInKB * 1024)}!
          </>
        ),
      });
    }

    if (newErrorFiles.length > 0) {
      setErrorFiles(newErrorFiles);
      setOpen(true);
    } else {
      setPrimaryImg([file]);
    }
  };

  function getImageSource(img) {
    if (typeof img === "string") {
      return img;
    }
    return URL.createObjectURL(img[0]);
  }

  const handleCategoryChange = (event, selectedOptions) => {
    setValueCategories(selectedOptions);
  };

  return (
    <div className="sm:my-8" aria-label="Header">
      <h2 className="text-xl sm:text-2xl font-bold my-4">Header</h2>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            required
            id="title"
            label="Title"
            placeholder="Title of idea"
            className="w-full sm:w-[720px] my-2"
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 255 }}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <div className="flex my-6">
        <img
          src={primaryImg ? getImageSource(primaryImg) : addPicture}
          alt="standard"
          className="w-[192px] h-[149px] sm:w-[212px] sm:h-[174px]"
        />
        <div className="w-1/2 sm:w-auto mx-2 flex flex-col justify-center items-center sm:mx-6">
          <Controller
            name="primaryImg"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <UploadButton
                id="uploadPrimaryImage"
                accept=".jpeg, .jpg, .png"
                onChange={(event) => {
                  const { files } = event.target;
                  const file = files[0];
                  onChange(file);
                  handleChangePrimaryPicture(event);
                }}
                value={value}
              >
                ADD
              </UploadButton>
            )}
          />

          <Button
            variant="outlined"
            color="error"
            startIcon={<TrashIcon className="h-6 w-6" />}
            className="w-[110px] rounded-full mx-2 my-2 sm:w-[174px]"
            onClick={() => {
              setPrimaryImg(null);
            }}
          >
            DELETE
          </Button>
        </div>
      </div>
      <Controller
        name="context"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            id="context"
            label="Context"
            required
            multiline
            rows={4}
            defaultValue={value}
            onChange={onChange}
            inputProps={{ maxLength: 255 }}
            placeholder="Leave a few words"
            className="w-full sm:w-[720px] my-4"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      {categoriesApi && (
        <Autocomplete
          multiple
          id="categories"
          value={valueCategories}
          options={categoriesApi}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          className="w-full sm:w-[720px] my-4"
          disablePortal
          onChange={(event, selectedOptions) => {
            handleCategoryChange(event, selectedOptions);
          }}
          filterOptions={(options) =>
            options.filter(
              (option) =>
                valueCategories.length < 3 ||
                valueCategories.some((category) => category.id === option.id)
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              id="titleIdea"
              required={valueCategories.length === 0}
              label="Categories"
              placeholder="Select category or categories"
              InputLabelProps={{ shrink: true }}
            />
          )}
          renderTags={(tag, getTagProps) =>
            tag.map((option, index) => (
              <CustomChip
                label={option.label}
                colorchoice={option.color}
                {...getTagProps({ index })}
              />
            ))
          }
        />
      )}
    </div>
  );
}
export default IdeaHeader;
