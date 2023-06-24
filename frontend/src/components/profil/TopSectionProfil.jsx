import { useState, useContext } from "react";
import {
  MapPinIcon,
  LinkIcon,
  PencilSquareIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../contexts/UserContext";
import AvatarUserProfile from "../avatar/AvatarUserProfile";
import ModifierButton from "./ModifierButton";
import { sm } from "../../utils/mediaQueries";
import ModalEditImage from "./ModalEditImage";

function TopSectionProfil() {
  const {
    imgUrl,
    imgBanner,
    firstname,
    lastname,
    agency,
    position,
    city,
    country,
    mail,
    id,
  } = useContext(UserContext);
  const userId = useParams();
  const isCurrentUserProfile = parseInt(userId.id, 10) === parseInt(id, 10);
  const smallQuery = useMediaQuery(sm);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBanner, setIsOpenBanner] = useState(false);

  const toggleModal = (state, setter) => {
    setter(!state);
  };

  // const handleSave = (src, newSrc) => {
  //   src = newSrc;
  // };

  return (
    <div className="flex flex-col flex-start">
      <div className="relative mb-16">
        <div className="absolute ml-6 bottom-[-48px]">
          <div className="relative ">
            <AvatarUserProfile />
            {isCurrentUserProfile && (
              <div className="absolute left-16 bottom-[-4px]">
                <ModifierButton
                  onClick={() => toggleModal(isOpenAvatar, setIsOpenAvatar)}
                />
              </div>
            )}
          </div>
        </div>
        {isCurrentUserProfile && (
          <div className="absolute right-7 bottom-[+20px] md:bottom-[+20px] md:right-5">
            <ModifierButton
              onClick={() => toggleModal(isOpenBanner, setIsOpenBanner)}
            />
          </div>
        )}
        {isCurrentUserProfile && smallQuery && (
          <Button
            variant="outlined"
            className="absolute rounded-3xl w-32 h-11 right-5 bottom-[-50px]"
          >
            <span className="flex gap-2 text-primary-900">
              <PencilSquareIcon className="h-6 w-6" />
              <span className="font-bold">MODIFY</span>
            </span>
          </Button>
        )}
        <div
          className="w-full h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imgBanner})`,
          }}
        />
      </div>
      <div className="flex w-full justify-between items-center mb-4 md:mb-1">
        <h2 className="ml-5 font-regular text-2xl text-black">
          {firstname} {lastname}
        </h2>
        {isCurrentUserProfile && !smallQuery && (
          <Button variant="outlined" className="rounded-3xl w-32 h-11 mr-7">
            <span className="flex gap-2 text-primary-900">
              <PencilSquareIcon className="h-6 w-6" />
              <span className="font-bold">MODIFY</span>
            </span>
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 ml-5 lg:flex-row lg:gap-12">
        <div className="flex gap-1 justify-start items-center">
          <BriefcaseIcon className="h-6 w-6 text-secondary-600" />
          <p className="font-medium text-secondary-600">
            {agency}, {position}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <MapPinIcon className="h-6 w-6 text-secondary-600" />
          <p className="ml-1 font-medium text-secondary-600">
            {city}, {country}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <LinkIcon className="h-6 w-6 text-secondary-600" />
          <p className="ml-1 font-medium">
            <a href={`mailto:${mail}`} className="text-bg-primary-900">
              {mail}
            </a>
          </p>
        </div>
      </div>
      <ModalEditImage
        isOpen={isOpenAvatar}
        src={imgUrl}
        onClose={() => toggleModal(isOpenAvatar, setIsOpenAvatar)}
        onSave={() => console.info("bonjour")}
        width="158"
        height="158"
        radius="150"
      />

      <ModalEditImage
        isOpen={isOpenBanner}
        src={imgBanner}
        onClose={() => toggleModal(isOpenBanner, setIsOpenBanner)}
        onSave={() => console.info("bonjour")}
        width="1136"
        height="256"
        radius="0"
      />
    </div>
  );
}

export default TopSectionProfil;
