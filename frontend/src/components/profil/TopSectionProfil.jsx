import { useContext } from "react";
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

function TopSectionProfil() {
  const {
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
          >
            <span className="flex gap-2 text-primary-900">
              <PencilSquareIcon className="h-6 w-6" />
              <span className="font-bold">MODIFY</span>
            </span>
          </Button>
        )}
        <img src={imgBanner} alt="banner" className=" h-53 w-full " />
      </div>
      <div className="flex w-full justify-between items-center mb-4 md:mb-1">
        <h1 className="ml-5 font-regular text-2xl">
          {firstname} {lastname}
        </h1>
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
        <div className="flex gap-1 justify-start">
          <BriefcaseIcon className="h-6 w-6 text-secondary-600" />
          <h4 className="font-medium text-secondary-600">
            {agency}, {position}
          </h4>
        </div>
        <div className="flex justify-start">
          <MapPinIcon className="h-6 w-6 text-secondary-600" />
          <h4 className="ml-1 font-medium text-secondary-600">
            {city}, {country}
          </h4>
        </div>
        <div className="flex justify-start">
          <LinkIcon className="h-6 w-6 text-secondary-600" />
          <h4 className="ml-1 font-medium">
            <a href={`mailto:${mail}`} className="text-bg-primary-900">
              {mail}
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default TopSectionProfil;
