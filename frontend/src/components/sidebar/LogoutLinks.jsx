import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { sm } from "../../utils/mediaQueries";

function LogoutLinks() {
  const location = useLocation();
  const smallQuery = useMediaQuery(sm);
  return !smallQuery ? (
    <ListItemButton
      component={Link}
      to="#"
      className={`w-full ${
        location.pathname === "#" ? "Mui-selected text-primary-50" : ""
      }`}
    >
      <ListItemIcon>
        <ArrowRightOnRectangleIcon
          className={`h-6 w-6 ${
            location.pathname === "#" ? "text-primary-50" : ""
          }`}
        />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  ) : null;
}
export default LogoutLinks;
