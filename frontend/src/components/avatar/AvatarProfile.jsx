import { useContext } from "react";
import { Avatar, Paper } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import AvatarDoghnut from "./AvatarDoghnut";

function AvatarProfile() {
  const { firstname, lastname, imgUrl } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center mt-6 -mx-2">
      <Paper
        elevation={4}
        className="rounded-full h-48 w-48 flex items-center justify-center relative"
      >
        <Avatar alt="profil-picture" src={imgUrl} className="w-40 h-40 z-10" />
        <AvatarDoghnut />
        <Paper
          elevation={4}
          className="rounded-full absolute bottom-[-16px] w-14 h-14 bg-primary-900 z-20"
        >
          <Avatar alt="score" className="bg-transparent h-full w-full">
            56
          </Avatar>
        </Paper>
      </Paper>

      <h4 className="mx-2 mt-8 font-medium text-xl">
        {`${firstname} ${lastname}`}
      </h4>
    </div>
  );
}
export default AvatarProfile;
