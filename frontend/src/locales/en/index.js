import buttons from "./buttons.json";
import datagrid from "./datagrid.json";
import menu from "./menu.json";
import settingsPage from "./pages/settings.json";
import ideasPages from "./pages/ideas/index";
import adminpannel from "./pages/admin/index";
import login from "./pages/login.json";

const translationEN = {
  pages: {
    settings: settingsPage,
    ideas: ideasPages,
    adminpannel,
    login,
  },
  menu,
  buttons,
  datagrid,
};

export default translationEN;
