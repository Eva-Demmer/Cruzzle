import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";

import UserProvider from "./contexts/UserContext";

import themeMui from "./themes/muiTheme";

import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";

import Ideas from "./pages/ideas/Ideas";
import Idea from "./pages/ideas/Idea";
import NewIdea from "./pages/ideas/IdeaNew";
import Favorits from "./pages/ideas/Favorits";

import Profile from "./pages/users/Profile";
import ProfileEdit from "./pages/users/ProfileEdit";
import Profiles from "./pages/users/Profiles";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminIdeas from "./pages/admin/AdminIdeas";

import Settings from "./pages/Settings";
import Search from "./pages/Search";

import "./styles/main.scss";
import LanguageProvider from "./contexts/LanguageContext";
import MenuProvider from "./contexts/MenuContext";

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
        path: "ideas/",
        element: <Ideas />,
      },
      {
        path: "ideas/:id",
        element: <Idea />,
      },
      {
        path: "ideas/:id/edit",
        element: <NewIdea />,
      },
      {
        path: "ideas/new",
        element: <NewIdea />,
      },
      {
        path: "favorits/",
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
        path: "settings/",
        element: <Settings />,
      },
      {
        path: "search/",
        element: <Search />,
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
          <MenuProvider>
            <LanguageProvider>
              <RouterProvider router={router} />
            </LanguageProvider>
          </MenuProvider>
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
