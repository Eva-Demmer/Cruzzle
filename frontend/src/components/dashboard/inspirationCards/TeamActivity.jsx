import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiTotalIdeasCount } from "../../../services/api.ideas";
import CountAnimation from "../../animations/CounterAnimation";
import puzzlePieces from "../../../assets/dashboard/PuzzlePieces.svg";

function TeamActivity() {
  const { t } = useTranslation();
  const [totalIdeas, setTotalIdeas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalIdeasResponse = await apiTotalIdeasCount();
        setTotalIdeas(totalIdeasResponse.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching total ideas data:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div id="title-team-activity" className="w-full flex justify-center">
        <h3 className="text-black text-lg md:text-xl xl:text-lg text-center mb-5">
          {t("pages.home.inspirationCards.teamActivity")}
        </h3>
      </div>
      <div id="score" className="w-full flex flex-col items-center text-center">
        <img
          src={puzzlePieces}
          alt="puzzle pieces"
          className="w-fit absolute top-8 opacity-70"
        />
        <CountAnimation targetCount={totalIdeas} />
        <span className="pt-4 text-secondary-600">
          {t("pages.home.inspirationCards.createdIdea")}
        </span>
      </div>
    </>
  );
}

export default TeamActivity;
