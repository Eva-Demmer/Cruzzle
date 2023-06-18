import { useContext } from "react";
import { Avatar, Paper } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";

function AvatarNavbar() {
  const { imgUrl } = useContext(UserContext);

  return (
    <Paper
      elevation={4}
      className="rounded-full w-8 h-8 flex items-center justify-center relative"
    >
      <Avatar alt="profil-picture" src={imgUrl} className="w-7 h-7 z-10" />
    </Paper>
  );
}
export default AvatarNavbar;