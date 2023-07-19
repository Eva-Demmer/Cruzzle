import { useState, useEffect, useContext } from "react";
import { Paper, Divider } from "@mui/material";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import medalGold from "../../assets/dashboard/Medal_gold.png";
import medalSilver from "../../assets/dashboard/Medal_silver.png";
import medalBronze from "../../assets/dashboard/Medal_bronze.png";
import puzzlePieces from "../../assets/dashboard/PuzzlePieces_1.svg";
import { HalfCircleProgress, pointsNextLevel } from "./HalfCircleProgress";
import CountAnimation from "../animations/CounterAnimation";
import { UserContext } from "../../contexts/UserContext";
import { apiLeaderboard } from "../../services/api.users";
import { apiTotalIdeasCount } from "../../services/api.ideas";
import { apiGetTotalLikesReceivedByUserId } from "../../services/api.ideaLikes";
import { apiGetTotalCommentsReceivedByUserId } from "../../services/api.comments";

function InspirationCards() {
  const { user } = useContext(UserContext);
  const { id } = user;
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalIdeas, setTotalIdeas] = useState(0);

  // fetch leaderboard
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

  // fetch number of total likes and comments received by specific user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalLikesResponse = await apiGetTotalLikesReceivedByUserId(id);
        setTotalLikes(totalLikesResponse.data);

        const totalCommentsResponse = await apiGetTotalCommentsReceivedByUserId(
          id
        );
        setTotalComments(totalCommentsResponse.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching total likes or comments data:",
          error
        );
      }
    };

    fetchData();
  }, [user]);

  // fetch number of ideas created on platform
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
    <div className="px-5 xl:-ml-24 flex items-center gap-5 xl:gap-3 overflow-x-auto no-scrollbar xl:overflow-x-hidden">
      {/* Leaderboard card */}
      <Paper
        elevation={3}
        className="h-80 w-56 xl:h-72 xl:w-48 rounded-2xl relative flex-shrink-0 my-2"
      >
        <h3 className="text-black text-lg md:text-xl px-5 pt-6 text-center relative z-10">
          Top cruzzlers this month
        </h3>
        <div className="flex flex-col px-5 mt-5">
          <div className="flex flex-row items-center">
            <img src={medalGold} alt="gold medal" className="h-10 xl:h-8" />
            <span className="pl-3 text-secondary-600">
              {leaderboard.length > 0 &&
                `${leaderboard[0].firstname} ${leaderboard[0].lastname}`}
            </span>
          </div>
          <Divider variant="middle" className="my-4 mx-0" />
          <div className="flex flex-row items-center">
            <img src={medalSilver} alt="silver medal" className="h-10 xl:h-8" />
            <span className="pl-3 text-secondary-600">
              {leaderboard.length > 0 &&
                `${leaderboard[1].firstname} ${leaderboard[1].lastname}`}
            </span>
          </div>
          <Divider variant="middle" className="my-4 mx-0" />
          <div className="flex flex-row items-center">
            <img src={medalBronze} alt="bronze medal" className="h-10 xl:h-8" />
            <span className="pl-3 text-secondary-600">
              {leaderboard.length > 0 &&
                `${leaderboard[2].firstname} ${leaderboard[2].lastname}`}
            </span>
          </div>
        </div>
      </Paper>
      {/* Next level card */}
      <Paper
        elevation={3}
        className="h-80 w-56 xl:h-72 xl:w-48 rounded-2xl flex-shrink-0 my-2 relative"
      >
        <div className="flex flex-col px-5 mt-5">
          <div className="h-20 flex justify-center">
            <span className="text-3xl mt-6 pt-3 flex">{pointsNextLevel}</span>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <HalfCircleProgress />
            </div>
          </div>
          <span className="pl-3 pb-5 xl:px-0 text-secondary-600">
            points until next level
          </span>
          <div className="mb-8 xl:mb-4 flex flex-col items-center relative">
            <HandThumbUpIcon className="w-24 xl:w-16 text-primary-50 absolute top-[-18px] opacity-10" />
            <span className="text-4xl xl:text-3xl">{totalLikes}</span>
            <span className="pl-3 text-secondary-600">likes received</span>
          </div>
          <div className="flex flex-col items-center relative">
            <ChatBubbleBottomCenterTextIcon className="w-24 xl:w-14 text-primary-50 absolute top-[-4px] opacity-10" />
            <span className="text-4xl xl:text-3xl">{totalComments}</span>
            <span className="pl-3 text-secondary-600">comments received</span>
          </div>
        </div>
      </Paper>
      {/* Team activity card */}
      <Paper
        elevation={3}
        className="h-80 w-56 xl:h-72 xl:w-48 rounded-2xl relative flex-shrink-0 my-2"
      >
        <div className="flex flex-col h-full items-center">
          <h3 className="text-black text-lg md:text-xl px-5 pt-6 text-center">
            Team activity
          </h3>
          <div className="flex flex-col items-center flex-grow justify-end">
            <img
              src={puzzlePieces}
              alt="puzzle pieces"
              className="w-8/12 absolute -top-0"
            />
            <div className="flex flex-col items-center py-[22px]">
              <CountAnimation targetCount={totalIdeas} />
              <span className="pt-4 text-secondary-600">
                ideas created on Cruzzle
              </span>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default InspirationCards;
