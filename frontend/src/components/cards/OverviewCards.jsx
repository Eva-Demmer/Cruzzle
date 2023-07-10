import { useState, useEffect, useContext } from "react";
import {
  LightBulbIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
// import puzzleIcon from "../../assets/PuzzleIcon.svg";
import { apiIdeas } from "../../services/api.ideas";
import { UserContext } from "../../contexts/UserContext";
import Card from "./IndividualOverviewCard";

function OverviewCards() {
  const { user } = useContext(UserContext);

  const {
    _count: { id, comment_like: commentLike, idea },
  } = user;
  const [ideasCreatedToday, setIdeasCreatedToday] = useState(0);

  // const [finishedPuzzles, setFinishedPuzzles] = useState("à faire");

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
    if (id) {
      fetchIdeasCreatedToday();
    }
  }, [id]);

  // TODO: add finished puzzles route (and service)

  return (
    <div className="md:pl-5 lg:w-3/4 grid grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-12 ">
      <Card
        icon={LightBulbIcon}
        rotate={45}
        cardTitle="Your ideas"
        state={idea}
        isIcon
      />
      <Card
        icon={PencilIcon}
        rotate={0}
        cardTitle="Today's ideas"
        state={ideasCreatedToday}
        isIcon
      />
      <Card
        icon={SquaresPlusIcon}
        rotate={0}
        cardTitle="Participations"
        state={commentLike}
        isIcon
      />
      {/* <Card
        icon={puzzleIcon}
        rotate={0}
        cardTitle="Finished puzzles"
        state={finishedPuzzles}
        isIcon={false}
      /> */}
    </div>
  );
}

export default OverviewCards;
