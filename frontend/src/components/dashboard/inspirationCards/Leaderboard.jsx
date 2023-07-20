import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { apiLeaderboard } from "../../../services/api.users";
import medalGold from "../../../assets/dashboard/Medal_gold.png";
import medalSilver from "../../../assets/dashboard/Medal_silver.png";
import medalBronze from "../../../assets/dashboard/Medal_bronze.png";

function Leaderboard() {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await apiLeaderboard();
        setLeaderboard(leaderboardResponse);
      } catch (error) {
        console.error(
          "An error occurred while fetching the leaderboard",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div id="title-leaderboard" className="w-full flex justify-center">
        <h3 className="text-black text-lg md:text-xl xl:text-lg text-center mb-5">
          {t("pages.home.inspirationCards.topCruzzlers")}
        </h3>
      </div>
      <div id="podium" className="w-full h-full flex flex-col justify-between">
        <div id="top-1" className="w-full">
          <div className="flex flex-row items-center">
            <img
              src={medalGold}
              alt="gold medal"
              className="h-10 xl:h-8 pl-2"
            />
            <span className="px-2 text-secondary-600">
              {leaderboard.length > 0 &&
                `${leaderboard[0].firstname} ${leaderboard[0].lastname}`}
            </span>
          </div>
        </div>
        <Divider variant="middle" />
        <div id="top-2" className="w-full">
          <div className="flex flex-row items-center">
            <img
              src={medalSilver}
              alt="silver medal"
              className="h-10 xl:h-8 pl-2"
            />
            <span className="px-2 text-secondary-600">
              {leaderboard.length > 0 &&
                `${leaderboard[1].firstname} ${leaderboard[1].lastname}`}
            </span>
          </div>
        </div>
        <Divider variant="middle" />
        <div id="top-3" className="w-full">
          <div className="flex flex-row items-center">
            <img
              src={medalBronze}
              alt="bronze medal"
              className="h-10 xl:h-8 pl-2"
            />
            <span className="px-2 text-secondary-600">
              {leaderboard.length > 0 &&
                `${leaderboard[2].firstname} ${leaderboard[2].lastname}`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
