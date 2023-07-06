import React, { useContext, useState } from "react";
import {
  MapPinIcon,
  LinkIcon,
  PencilSquareIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { sm } from "../../utils/mediaQueries";
import ModifierButton from "./ModifierButton";
import AvatarUserProfile from "../avatar/AvatarUserProfile";
import ModalEditProfil from "./ModalEditProfil";
import { UserProfileContext } from "../../contexts/UserProfile";

function TopSectionProfil() {
  const { user } = useContext(UserProfileContext);
  const { id } = useParams();
  const isCurrentUserProfile = parseInt(id, 10) === parseInt(user.id, 10);
  const smallQuery = useMediaQuery(sm);
  const [openEdit, setOpenEdit] = useState(false);
  const {
    firstname,
    lastname,
    banner_url: bannerUrl,
    agency: { name: agencyName },
    position: { name: positionName },
    link,
  } = user;

  const toggleModal = (state, setter) => {
    setter(!state);
  };

  console.info(user);
  console.info(isCurrentUserProfile, parseInt(id, 10), parseInt(user.id, 10));

  return (
    <div className="flex flex-col flex-start">
      <div className="relative mb-16">
        <div className="absolute ml-6 bottom-[-48px]">
          <div className="relative ">
            <AvatarUserProfile />
            {isCurrentUserProfile && (
              <div className="absolute left-16 bottom-[-4px]">
                <ModifierButton />
              </div>
            )}
          </div>
        </div>
        {isCurrentUserProfile && (
          <div className="absolute right-7 bottom-[+20px] md:bottom-[+20px] md:right-5">
            <ModifierButton />
          </div>
        )}
        {isCurrentUserProfile && smallQuery && (
          <Button
            variant="outlined"
            className="absolute rounded-3xl w-32 h-11 right-5 bottom-[-50px]"
            onClick={() => toggleModal(openEdit, setOpenEdit)}
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
            backgroundImage: `url(${bannerUrl})`,
          }}
        />
      </div>
      <div className="flex w-full justify-between items-center mb-4 md:mb-1">
        <h2 className="ml-5 font-regular text-2xl text-black">
          {firstname} {lastname}
        </h2>
        {isCurrentUserProfile && !smallQuery && (
          <Button
            variant="outlined"
            className="rounded-3xl w-32 h-11 mr-7"
            onClick={() => toggleModal(openEdit, setOpenEdit)}
          >
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
          <p className="font-medium text-secondary-600">{positionName}</p>
        </div>
        <div className="flex justify-start items-center">
          <MapPinIcon className="h-6 w-6 text-secondary-600" />
          <p className="ml-1 font-medium text-secondary-600">{agencyName}</p>
        </div>
        <div className="flex justify-start items-center">
          <LinkIcon className="h-6 w-6 text-secondary-600" />
          <p className="ml-1 font-medium">
            <a
              href={link}
              className="text-bg-primary-900"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          </p>
        </div>
      </div>
      <ModalEditProfil
        open={openEdit}
        close={() => toggleModal(openEdit, setOpenEdit)}
      />
    </div>
  );
}

export default TopSectionProfil;
