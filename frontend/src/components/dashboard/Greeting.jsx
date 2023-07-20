import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../contexts/UserContext";

function Greeting() {
  const [greeting, setGreeting] = useState("Welcome back");
  const { user } = useContext(UserContext);
  const { firstname } = user;
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const hour = new Date().getHours();
    let updatedGreeting;

    if (hour < 12) {
      updatedGreeting = "Good morning";
    } else if (hour < 18) {
      updatedGreeting = "Good afternoon";
    } else {
      updatedGreeting = "Good evening";
    }
    setGreeting(updatedGreeting);
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold">{greeting},</span>
      <span className="pt-4 xl:pt-2 text-4xl font-semibold">{firstname}</span>
      <p className="mt-6 mb-8 xl:mt-4 xl:mb-6">
        {t("pages.home.greetings.introduction")}
      </p>
      <div className="flex gap-5 xl:gap-6">
        <Button
          variant="contained"
          onClick={() => navigate("/ideas")}
          className="rounded-full bg-black"
        >
          {t("buttons.suggestions")}
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/ideas/new")}
          className="rounded-full"
        >
          {t("buttons.create")}
        </Button>
      </div>
    </div>
  );
}

export default Greeting;
