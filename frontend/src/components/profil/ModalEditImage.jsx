/* eslint-disable radix */
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { Modal } from "../modal/Modal";
import UploadButton from "../styledComponents/UploadButton";

function ModalEditImage({
  isOpen,
  src,
  radius,
  onClose,
  onSave,
  height,
  width,
}) {
  if (!isOpen) return null;
  const [slideScaleValue, setSlideScaleValue] = useState(10);
  const [slideRotateValue, setSlideRotateValue] = useState(0);
  // const [imgInfo, setImageInfo] = useState();
  const cropRef = useRef(null);

  // const handleSave = async () => {
  //   if (cropRef) {
  //     const dataUrl = cropRef.current.getImage().toDataURL();
  //     const result = await fetch(dataUrl);
  //     const blob = await result.blob();
  //     setImageInfo(URL.createObjectURL(blob));
  //     console.info(imgInfo);
  //   }
  // };

  // const handleImgChange = (e) => {
  //   setImageInfo(URL.createObjectURL(e.target.files[0]));
  //   // setModalOpen(true);
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={onSave}>
      <div className="flex flex-col items-center justify-center">
        <UploadButton accept="image/*">New file</UploadButton>
        <AvatarEditor
          ref={cropRef}
          image={src}
          width={parseInt(width)}
          height={parseInt(height)}
          border={50}
          borderRadius={parseInt(radius)}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={slideScaleValue / 10}
          rotate={slideRotateValue}
        />
        <div className="flex justify-center items-center gap-6 w-full px-2 mt-8 sm:w-[70%]">
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
        <div className="flex justify-center items-center gap-6 w-full px-2 sm:w-[70%]">
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
  onSave: PropTypes.func.isRequired,
};

export default ModalEditImage;
