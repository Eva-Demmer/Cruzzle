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
// import { apiUserLeaderboard } from "../../services/api.users";
import { apiTotalIdeasCount } from "../../services/api.ideas";
import { apiGetTotalLikesReceivedByUserId } from "../../services/api.ideaLikes";
import { apiGetTotalCommentsReceivedByUserId } from "../../services/api.comments";

function InspirationCards() {
  const { user } = useContext(UserContext);
  const { id } = user;
  // const [leaderboard, setLeaderboard] = useState();
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalIdeas, setTotalIdeas] = useState(0);

  // for the first three days of the month: display loading for users

  // // fetch leaderboard
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const leaderboardResponse = await apiUserLeaderboard();
  //       console.info("leaderboard data", leaderboardResponse);
  //       setLeaderboard(leaderboardResponse.data);
  //     } catch (error) {
  //       console.error(
  //         "An error occurred while fetching the leaderboard",
  //         error
  //       );
  //     }
  //   };
  //   fetchData();
  // }, []);

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
    <div className="pr-6 -ml-20 flex flex-col lg:flex-row gap-5 lg:gap-10">
      {/* Leaderboard card */}
      <Paper elevation={3} className="h-80 w-56 rounded-2xl relative">
        <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-6 text-center relative z-10">
          Top cruzzlers this month
        </h3>
        <div className="flex flex-col px-5 mt-5">
          <div className="flex flex-row items-center">
            <img src={medalGold} alt="gold medal" className="h-10" />
            <span className="pl-3 text-secondary-600">abc</span>
            <span className="pl-3 text-secondary-600">
              {/* {leaderboard[0].firstname} */}
            </span>
          </div>
          <Divider variant="middle" className="my-4 mx-0" />
          <div className="flex flex-row items-center">
            <img src={medalSilver} alt="silver medal" className="h-10" />
            <span className="pl-3 text-secondary-600">Matthias Cruzzle</span>
          </div>
          <Divider variant="middle" className="my-4 mx-0" />
          <div className="flex flex-row items-center">
            <img src={medalBronze} alt="bronze medal" className="h-10" />
            <span className="pl-3 text-secondary-600">Nelson Monfort</span>
          </div>
        </div>
      </Paper>
      {/* Next level card */}
      <Paper elevation={3} className="h-80 w-56 rounded-2xl">
        <div className="flex flex-col px-5 mt-5">
          <div className="h-20 flex justify-center">
            <span className="text-3xl mt-6 pt-3">{pointsNextLevel}</span>
            <HalfCircleProgress />
          </div>
          <span className="pl-3 pb-5 text-secondary-600">
            points until next level
          </span>
          <div className="mb-8 flex flex-col items-center relative">
            <HandThumbUpIcon className="w-24 text-primary-50 absolute top-[-18px] opacity-10" />
            <span className="text-4xl">{totalLikes}</span>
            <span className="pl-3 text-secondary-600">likes received</span>
          </div>
          <div className="flex flex-col items-center relative">
            <ChatBubbleBottomCenterTextIcon className="w-20 text-primary-50 absolute top-[-10px] opacity-10" />
            <span className="text-4xl">{totalComments}</span>
            <span className="pl-3 text-secondary-600">comments received</span>
          </div>
        </div>
      </Paper>
      {/* Team activity card */}
      <Paper elevation={3} className="h-80 w-56 rounded-2xl relative">
        <div className="flex flex-col items-center">
          <img
            src={puzzlePieces}
            alt="puzzle pieces"
            className="w-10/12 absolute -top-12"
          />
          <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-6 text-center">
            Team activity
          </h3>
          <div className="py-5 flex items-center justify-center">
            <Paper
              elevation={0}
              className="h-40 w-40 rounded-full flex items-center justify-center"
            >
              <CountAnimation targetCount={totalIdeas} />
            </Paper>
          </div>
          <span className=" text-secondary-600 flex items-center justify-center">
            ideas created on Cruzzle
          </span>
        </div>
      </Paper>
    </div>
  );
}

export default InspirationCards;
