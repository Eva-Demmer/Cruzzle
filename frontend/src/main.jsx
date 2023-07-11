import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import "./config/i18n";

import UserProvider from "./contexts/UserContext";

import themeMui from "./themes/muiTheme";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";

import Ideas from "./pages/ideas/Ideas";
import Idea from "./pages/ideas/Idea";
import IdeaNew from "./pages/ideas/IdeaNew";
import Favorits from "./pages/ideas/Favorits";

import Profile from "./pages/users/Profile";
import ProfileEdit from "./pages/users/ProfileEdit";
import Profiles from "./pages/users/Profiles";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminIdeas from "./pages/admin/AdminIdeas";
import AdminCategories from "./pages/admin/AdminCategories";

import Settings from "./pages/Settings";

import "./styles/main.scss";
import AlertToastProvider from "./contexts/AlertToastContext";
import LanguageProvider from "./contexts/LanguageContext";
import MenuProvider from "./contexts/MenuContext";
import FilterProvider from "./contexts/FilterContext";
import ScrollProvider from "./contexts/ScrollContext";
import IdeaPageProvider from "./contexts/IdeaPageContext";
import IdeaEdit from "./pages/ideas/IdeaEdit";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard/",
        element: <Home />,
      },
      {
        path: "ideas/",
        element: <Ideas />,
      },
      {
        path: "ideas/:id",
        element: <Idea />,
      },
      {
        path: "ideas/:id/edit",
        element: <IdeaEdit />,
      },
      {
        path: "ideas/new",
        element: <IdeaNew />,
      },
      {
        path: "favorites/",
        element: <Favorits />,
      },
      {
        path: "users/:id",
        element: <Profile />,
      },
      {
        path: "users/:id/edit",
        element: <ProfileEdit />,
      },
      {
        path: "users/",
        element: <Profiles />,
      },
      {
        path: "admin/users/",
        element: <AdminUsers />,
      },
      {
        path: "admin/ideas/",
        element: <AdminIdeas />,
      },
      {
        path: "admin/categories/",
        element: <AdminCategories />,
      },
      {
        path: "settings/",
        element: <Settings />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themeMui}>
        <UserProvider>
          <AlertToastProvider>
            <MenuProvider>
              <LanguageProvider>
                <FilterProvider>
                  <ScrollProvider>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="fr"
                    >
                      <IdeaPageProvider>
                        <RouterProvider router={router} />
                      </IdeaPageProvider>
                    </LocalizationProvider>
                  </ScrollProvider>
                </FilterProvider>
              </LanguageProvider>
            </MenuProvider>
          </AlertToastProvider>
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
