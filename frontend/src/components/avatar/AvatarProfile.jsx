import { useContext } from "react";
import { Avatar, Paper } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import AvatarDoghnut from "./AvatarDoghnut";

function AvatarProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center mt-6 -mx-2">
      <Paper
        elevation={4}
        className="rounded-full w-36 h-36 flex items-center justify-center relative sm:h-44 sm:w-44 lg:h-48 lg:w-48"
      >
        <Avatar
          alt="profil-picture"
          src={user.avatar_url}
          className="w-28 h-28 z-10 shadow shadow-black border-solid border-black border sm:w-36 sm:h-36 lg:w-40 lg:h-40"
        />
        <AvatarDoghnut />
        <Paper
          elevation={4}
          className="rounded-full absolute bottom-[-16px] w-14 h-14 bg-primary-900 z-20"
        >
          <Avatar alt="score" className="bg-transparent h-full w-full">
            {10}
          </Avatar>
        </Paper>
      </Paper>

      <h4 className="mx-2 mt-8 font-medium text-xl">
        {`${user.firstname} ${user.lastname}`}
      </h4>
    </div>
  );
}
export default AvatarProfile;
