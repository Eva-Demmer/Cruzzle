import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderNav from "../components/topbar/HeaderNav";
import { sm } from "../utils/mediaQueries";
import { MenuContext } from "../contexts/MenuContext";
import { ScrollContext } from "../contexts/ScrollContext";
import { UserContext } from "../contexts/UserContext";
import { apiUserById } from "../services/api.users";

function Root() {
  const { user, setUser } = useContext(UserContext);
  const smallQuery = useMediaQuery(sm);
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const { divRef } = useContext(ScrollContext);
  const navigate = useNavigate();
  const location = useLocation();

  const setCurrentUserIntoUserContext = (token) => {
    const parts = token.split(".");
    const payload = JSON.parse(atob(parts[1]));
    apiUserById(payload.id)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        } else {
          console.error("cannot get user by id");
        }
      })
      .catch((err) => {
        console.error("error get user by id", err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUserIntoUserContext(token);
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useLayoutEffect(() => {
    if (smallQuery && !activeMenu) {
      setActiveMenu(true);
    }
    if (!smallQuery && activeMenu) {
      setActiveMenu(false);
    }
  }, [smallQuery]);

  return !user ? (
    <div className="h-screen w-screen flex items-center justify-center">
      loading...
    </div>
  ) : (
    <div className="flex h-screen overflow-hidden">
      {smallQuery && <Sidebar />}
      <div
        className="h-full relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
        ref={divRef}
        id="scrollbar"
      >
        <div className=" sticky flex flex-col top-0 z-50 w-full">
          <HeaderNav />
          {!smallQuery && activeMenu && <Sidebar />}
        </div>
        <main className="grow h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Root;
