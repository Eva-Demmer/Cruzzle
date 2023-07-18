import buttons from "./buttons.json";
import datagrid from "./datagrid.json";
import datepicker from "./datepicker.json";
import menu from "./menu.json";
import settingsPage from "./pages/settings.json";
import ideasPages from "./pages/ideas/index";
import adminpannel from "./pages/admin/index";
import error from "./pages/error.json";
import users from "./pages/users/index";
import login from "./pages/login.json";

const translationEN = {
  pages: {
    settings: settingsPage,
    ideas: ideasPages,
    adminpannel,
    login,
    users,
    error,
  },
  menu,
  buttons,
  datagrid,
  datepicker,
};

export default translationEN;
