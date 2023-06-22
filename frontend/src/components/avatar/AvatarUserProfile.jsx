import { useContext } from "react";
import { Avatar, Paper } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";

function AvatarUserProfile() {
  const { imgUrl } = useContext(UserContext);

  return (
    <div>
      <Paper
        elevation={4}
        className="rounded-full w-28 h-28 flex items-center justify-center relative sm:h-24 sm:w-24 lg:h-28 lg:w-28"
      >
        <Avatar
          alt="profil-picture"
          src={imgUrl}
          className="w-24 h-24 z-10 shadow shadow-black border-solid border-black border sm:w-20 sm:h-20 lg:w-24 lg:h-24"
        />
      </Paper>
    </div>
  );
}

export default AvatarUserProfile;
