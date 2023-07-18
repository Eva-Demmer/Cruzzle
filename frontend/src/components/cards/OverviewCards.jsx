import { useState, useEffect, useContext } from "react";
import {
  LightBulbIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import puzzleIcon from "../../assets/PuzzleIcon.svg";
import { apiIdeas } from "../../services/api.ideas";
import { UserContext } from "../../contexts/UserContext";
import Card from "./IndividualOverviewCard";
import { getUserPuzzlePercentageAchievementObject } from "../../utils/gamification";

function OverviewCards() {
  const { user } = useContext(UserContext);

  const [myIdeas, setMyIdeas] = useState(0);
  const [participation, setParticipation] = useState(0);
  const [ideasCreatedToday, setIdeasCreatedToday] = useState(0);
  const [finishedPuzzles, setFinishedPuzzles] = useState(0);

  useEffect(() => {
    const updateMyIdeasAndParticipations = () => {
      const {
        _count: { idea: newIdea, comment_like: newParticipation },
      } = user;
      setParticipation(newParticipation);
      setMyIdeas(newIdea);
    };
    if (user) {
      updateMyIdeasAndParticipations();
    }
  }, [user]);

  useEffect(() => {
    const fetchIdeasCreatedToday = async () => {
      try {
        const response = await apiIdeas(`${user.id}/count`);
        setIdeasCreatedToday(response.count);
      } catch (error) {
        setIdeasCreatedToday("N/A");
        console.error("Error fetching ideas created today:", error);
      }
    };
    if (user) {
      fetchIdeasCreatedToday();
    }
  }, [user]);

  useEffect(() => {
    const updateFinishedPuzzles = async () => {
      try {
        const puzzlesPercentageAchievement =
          getUserPuzzlePercentageAchievementObject(user);
        const puzzleTot = Object.values(puzzlesPercentageAchievement).reduce(
          (acc, percent) => {
            return acc + (percent === 100 ? 1 : 0);
          },
          0
        );
        setFinishedPuzzles(puzzleTot);
      } catch (error) {
        setFinishedPuzzles("N/A");
        console.error("Error updating finished puzzles:", error);
      }
    };
    if (user) {
      updateFinishedPuzzles();
    }
  }, [user]);

  return (
    <div className="md:pl-5 max-w-xl grid grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-12 xl:gap-y-8 ">
      <Card
        isIcon
        icon={LightBulbIcon}
        rotate={45}
        cardTitle="Your ideas"
        state={myIdeas}
      />
      <Card
        isIcon
        icon={PencilIcon}
        rotate={0}
        cardTitle="Today's ideas"
        state={ideasCreatedToday}
      />
      <Card
        isIcon
        icon={SquaresPlusIcon}
        rotate={0}
        cardTitle="Participations"
        state={participation}
      />
      <Card
        isIcon={false}
        icon={puzzleIcon}
        rotate={0}
        cardTitle="Puzzles"
        state={finishedPuzzles}
      />
    </div>
  );
}

export default OverviewCards;
