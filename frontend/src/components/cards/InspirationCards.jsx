import { Paper, Divider } from "@mui/material";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import Trophy from "../../assets/dashboard/Trophy.png";
import medalGold from "../../assets/dashboard/Medal_gold.png";
import medalSilver from "../../assets/dashboard/Medal_silver.png";
import medalBronze from "../../assets/dashboard/Medal_bronze.png";
import AvatarDoghnut from "../avatar/AvatarDoghnut";
import CountAnimation from "../animations/CounterAnimation";

function InspirationCards() {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
      {/* Leaderboard card */}
      <Paper elevation={3} className="h-80 w-56 rounded-2xl relative">
        <img
          src={Trophy}
          alt="trophy"
          className="h-24 opacity-40 absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-6 text-center relative z-10">
          Top cruzzlers this month
        </h3>
        <div className="flex flex-col px-5 mt-5">
          <div className="flex flex-row items-center">
            <img src={medalGold} alt="gold medal" className="h-10" />
            <span className="pl-3 text-secondary-600">Sarah Conner</span>
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
          <div className="h-20">
            <AvatarDoghnut />
          </div>
          <span className="pl-3 pb-5 text-secondary-600">
            points until next level
          </span>
          {/* <div className="my-5 flex flex-col items-center relative">
            <HandThumbUpIcon className="w-10 text-primary-50 absolute top-[-14px] left-12 opacity-40" />
            <span className="text-2xl">184</span>
            <span className="pl-3 text-secondary-600">likes received</span>
          </div> */}
          {/* <div className="my-5 flex flex-col items-center relative">
            <ChatBubbleBottomCenterTextIcon className="w-10 text-primary-50 absolute top-[-14px] right-10 opacity-40" />
            <span className="text-2xl">375</span>
            <span className="pl-3 text-secondary-600">comments received</span>
          </div> */}
          <div className="mb-8 flex flex-col items-center relative">
            <HandThumbUpIcon className="w-24 text-primary-50 absolute top-[-18px] opacity-20" />
            <span className="text-4xl">184</span>
            <span className="pl-3 text-secondary-600">likes received</span>
          </div>
          <div className="flex flex-col items-center relative">
            <ChatBubbleBottomCenterTextIcon className="w-20 text-primary-50 absolute top-[-10px] opacity-20" />
            <span className="text-4xl">375</span>
            <span className="pl-3 text-secondary-600">comments received</span>
          </div>
        </div>
      </Paper>
      {/* Team activity card */}
      <Paper elevation={3} className="h-80 w-56 rounded-2xl">
        <div className="flex flex-col">
          <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-6 text-center">
            Team activity
          </h3>
          <div className="py-5 flex items-center justify-center">
            <Paper
              elevation={3}
              className="h-40 w-40 rounded-full flex items-center justify-center"
            >
              <CountAnimation targetCount={10682} />
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
