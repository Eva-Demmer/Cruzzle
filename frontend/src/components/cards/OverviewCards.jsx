import { useState, useEffect, useContext } from "react";
import {
  LightBulbIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { Paper } from "@mui/material";
import { apiIdeas } from "../../services/api.ideas";
import PuzzleIcon from "../../assets/PuzzleIcon.svg";
import { UserContext } from "../../contexts/UserContext";

function OverviewCards() {
  const { user } = useContext(UserContext);

  const {
    _count: { id, comment_like: commentLike, idea },
  } = user;

  const [ideasCreatedToday, setIdeasCreatedToday] = useState(0);
  const route = `${id}/count`;

  useEffect(() => {
    const fetchIdeasCreatedToday = async () => {
      try {
        const response = await apiIdeas(route);
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

  return (
    <div className="">
      <h3 className="pb-10 text-black">Overview</h3>
      <div className="md:pl-5 lg:w-3/4 xl:w-1/3 grid grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-12 ">
        <Paper
          elevation={3}
          className="h-36 w-36 md:w-48 lg:w-64 xl:w-48 xl:h-40 rounded-2xl flex flex-col relative"
        >
          <LightBulbIcon className="h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current transform rotate-45" />
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-5">
              Total ideas
            </h3>
            <h2 className="text-black text-3xl md:text-4xl px-4 pb-4">
              {idea}
            </h2>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="h-36 w-36 md:w-48 lg:w-64 xl:w-48 xl:h-40 rounded-2xl flex flex-col relative"
        >
          <PencilIcon className="h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current" />
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-5">
              Today's ideas
            </h3>
            <h2 className="text-black text-3xl md:text-4xl px-4 pb-4">
              {ideasCreatedToday}
            </h2>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="h-36 w-36 md:w-48 lg:w-64 xl:w-48 xl:h-40 rounded-2xl flex flex-col relative"
        >
          <SquaresPlusIcon className="h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current" />
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-5">
              Participations
            </h3>
            <h2 className="text-black text-3xl md:text-4xl px-4 pb-4">
              {commentLike}
            </h2>
          </div>
        </Paper>
        <Paper
          elevation={3}
          className="h-36 w-36 md:w-48 lg:w-64 xl:w-48 xl:h-40 rounded-2xl flex flex-col relative"
        >
          <img
            className="h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current"
            alt="puzzle"
            src={PuzzleIcon}
          />
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-5">
              Finished puzzles
            </h3>
            <h2 className="text-black text-3xl md:text-4xl px-4 pb-4">
              à faire
            </h2>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default OverviewCards;
