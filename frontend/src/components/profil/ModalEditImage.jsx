/* eslint-disable radix */
import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import AvatarEditor from "react-avatar-editor";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

import { Controller, useForm } from "react-hook-form";
import { Button, Slider } from "@mui/material";
import UploadButton from "../styledComponents/UploadButton";

import getNameFileToFirebaseLink from "../../utils/getNameFileToFirebaseLink";
import { apiUsers, apiUserPostImage } from "../../services/api.users";

import { UserContext } from "../../contexts/UserContext";
import Modal from "../modal/Modal";

function ModalEditImage({
  isOpen,
  src,
  radius,
  onClose,
  height,
  width,
  fieldName,
}) {
  const [slideScaleValue, setSlideScaleValue] = useState(10);
  const [slideRotateValue, setSlideRotateValue] = useState(0);
  const { user } = useContext(UserContext);

  const [inputAvatarEditor, setInputAvatarEditor] = useState(src);
  const [image, setImage] = useState();

  const { id } = useParams();
  const cropRef = useRef(null);

  useEffect(() => {
    const getImageHighRes = async () => {
      const filename = fieldName;

      // ESSAI pour url
      console.info(
        `/users/${user.id}/${filename}_img.${getNameFileToFirebaseLink(
          `${user[`${filename}_url`]}`
        )}`
      );
      //

      try {
        const getUrl = await apiUsers(`imageHighRes`, {
          url: `/users/${user.id}/${
            user[filename]
          }_img.${getNameFileToFirebaseLink(user[filename])}`,
        });
        if (getUrl) {
          setInputAvatarEditor(getUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getImageHighRes();
  }, []);

  const { handleSubmit, control } = useForm();

  const handleImgChange = (e) => {
    e.preventDefault();
    setInputAvatarEditor(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const onSubmit = async () => {
    const dataUrl = cropRef.current.getImageScaledToCanvas().toDataURL();
    const result = await fetch(dataUrl);
    const blob = await result.blob();

    const formData = new FormData();
    formData.append(fieldName, blob);
    formData.append(`${fieldName}_img`, image);

    setSlideScaleValue(10);
    setSlideRotateValue(0);

    try {
      const postImage = apiUserPostImage(formData, `image/${id}`);
      if (postImage) {
        console.info(postImage);
      } else {
        console.info("gerer les erreurs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal saveButton={false} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center w-full">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AvatarEditor
            className="object-contain"
            ref={cropRef}
            image={inputAvatarEditor}
            width={parseInt(width)}
            height={parseInt(height)}
            border={50}
            borderRadius={parseInt(radius)}
            color={[255, 255, 255, 0.5]}
            scale={slideScaleValue / 10}
            rotate={slideRotateValue}
            style={{ width: "100%" }}
            crossOrigin="anonymous"
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

          <div className="flex w-full justify-center">
            <Controller
              name="image"
              control={control}
              defaultValue={inputAvatarEditor}
              render={({ field: { value } }) => (
                <UploadButton
                  id="image"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImgChange}
                  value={value}
                >
                  Upload
                </UploadButton>
              )}
            />
            <Button
              type="submit"
              className="w-[110px] rounded-full mx-2 my-2 sm:w-[174px]"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
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
  fieldName: PropTypes.string.isRequired,
};

export default ModalEditImage;
