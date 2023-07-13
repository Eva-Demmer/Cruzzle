import buttons from "./buttons.json";
import datagrid from "./datagrid.json";
import menu from "./menu.json";
import settingsPage from "./pages/settings.json";
import ideasPages from "./pages/ideas/index";
import adminpannel from "./pages/admin/index";

const translationEN = {
  pages: {
    settings: settingsPage,
    ideas: ideasPages,
    adminpannel,
  },
  menu,
  buttons,
  datagrid,
};

export default translationEN;
