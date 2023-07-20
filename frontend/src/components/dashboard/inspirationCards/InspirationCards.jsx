import { useTranslation } from "react-i18next";
import Leaderboard from "./Leaderboard";
import Progress from "./Progress";
import TeamActivity from "./TeamActivity";

function InspirationCards() {
  const { t } = useTranslation();

  return (
    <>
      <h4 className="text-black pb-5 xl:hidden">
        {t("pages.home.dashboard.stats")}
      </h4>
      <div
        id="inspiration-cards"
        className="flex flex-col md:flex-row items-center gap-3 h-full"
      >
        <div
          id="leaderboard"
          className="border border-solid border-gray-100 w-64 md:w-full h-80 xl:h-full flex flex-col rounded-xl p-5 xl:p-2 bg-white shadow-2xl"
        >
          <Leaderboard />
        </div>
        <div
          id="points"
          className="border border-solid border-gray-100 w-64 md:w-full h-80 xl:h-full flex flex-col rounded-xl p-5 xl:p-2 bg-white shadow-2xl"
        >
          <Progress />
        </div>
        <div
          id="team activity"
          className="border border-solid border-gray-100 w-64 md:w-full h-80 xl:h-full flex flex-col justify-between rounded-xl p-5 xl:p-2 bg-white shadow-2xl relative"
        >
          <TeamActivity />
        </div>
      </div>
    </>
  );
}

export default InspirationCards;
