/* eslint-disable radix */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-unresolved
import AvatarEditor from "react-avatar-editor";
import { Slider } from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { Modal } from "../modal/Modal";
import UploadButton from "../styledComponents/UploadButton";

function ModalEditImage({ isOpen, src, radius, onClose, height, width }) {
  if (!isOpen) return null;
  const [slideScaleValue, setSlideScaleValue] = useState(10);
  const [slideRotateValue, setSlideRotateValue] = useState(0);
  const [newAvatar, setNewAvatar] = useState(src);
  const cropRef = useRef(null);

  useEffect(() => {
    console.info(`{from Modal source ic ${src}`);
  }, []);

  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImageScaledToCanvas().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setNewAvatar(URL.createObjectURL(blob));
      setSlideScaleValue(10);
      setSlideRotateValue(0);
      console.info("handleSave");
    }
  };

  const handleImgChange = (e) => {
    setNewAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={handleSave}>
      <div className="flex flex-col items-center justify-center">
        <UploadButton
          accept="image/*"
          onChange={handleImgChange}
          id="Upload Avatar"
        >
          New file
        </UploadButton>
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
};

export default ModalEditImage;
