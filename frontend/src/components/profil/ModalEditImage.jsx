/* eslint-disable radix */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import AvatarEditor from "react-avatar-editor";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

import { Controller, useForm } from "react-hook-form";
import { Button, Slider } from "@mui/material";
import UploadButton from "../styledComponents/UploadButton";

import { Modal } from "../modal/Modal";

function ModalEditImage({ isOpen, src, radius, onClose, height, width }) {
  const [slideScaleValue, setSlideScaleValue] = useState(10);
  const [slideRotateValue, setSlideRotateValue] = useState(0);
  const [newAvatar, setNewAvatar] = useState(src);

  const cropRef = useRef(null);

  const url = import.meta.env.VITE_BACKEND_URL;
  const route = "/api/users/avatar";

  const { handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    console.info(`{trigger useffect new avatar is now ${newAvatar}`);
  }, [newAvatar]);

  useEffect(() => {
    setValue("avatar", newAvatar); // Met à jour la valeur du champ "avatar"
  }, [newAvatar, setValue]);

  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImageScaledToCanvas().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setNewAvatar(URL.createObjectURL(blob));
      setSlideScaleValue(10);
      setSlideRotateValue(0);
      console.info("handleSave, newAvatar is : ", URL.createObjectURL(blob));
    }
  };

  const handleImgChange = (e) => {
    e.preventDefault();
    setNewAvatar(URL.createObjectURL(e.target.files[0]));
    console.info(
      "HandleImage, newAvatar is : ",
      URL.createObjectURL(e.target.files[0])
    );
  };

  const onSubmit = (data) => {
    handleSave();
    const formData = new FormData();
    formData.append("avatar", data);
    console.info(data);
    // axios
    //   .post(`${url}${route}`, formData)
    //   .then((response) => {
    //     console.info(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  // const onSubmit = (data) => {
  //   console.info(data);
  // };

  return (
    <Modal
      saveButton={false}
      isOpen={isOpen}
      onClose={onClose}
      // onSave={handleSave}
    >
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="avatar"
            control={control}
            defaultValue={newAvatar}
            render={({ field: { onChange, value } }) => (
              <UploadButton
                id="avatar"
                accept=".jpeg, .jpg, .png"
                onChange={handleImgChange}
                value={value}
              >
                new image
              </UploadButton>
            )}
          />

          <AvatarEditor
            ref={cropRef}
            image={newAvatar}
            width={parseInt(width)}
            height={parseInt(height)}
            border={50}
            borderRadius={parseInt(radius)}
            color={[255, 255, 255, 0.6]}
            scale={slideScaleValue / 10}
            rotate={slideRotateValue}
          />
          <div className="flex justify-center items-center gap-6 w-full px-2  sm:w-[70%]">
            <AspectRatioIcon fontSize="medium" color="grey" />
            <Slider
              className="pt-6"
              min={10}
              max={50}
              sx={{
                margin: "0 auto",
                width: "100%",
                color: "primary",
              }}
              size="medium"
              defaultValue={slideScaleValue}
              value={slideScaleValue}
              onChange={(e) => setSlideScaleValue(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center gap-6 w-full px-2 pb-4 sm:w-[70%]">
            <RotateRightIcon fontSize="medium" color="grey" />
            <Slider
              className="pt-6"
              min={0}
              max={360}
              sx={{
                margin: "0 auto",
                width: "100%",
                color: "primary",
              }}
              size="medium"
              defaultValue={slideRotateValue}
              value={slideRotateValue}
              onChange={(e) => setSlideRotateValue(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="outlined"
            // color="error"
            // className="w-[110px] rounded-full mx-2 my-2 sm:w-[174px]"
            // onClick={onSubmit}
          >
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
}

ModalEditImage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  radius: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalEditImage;
