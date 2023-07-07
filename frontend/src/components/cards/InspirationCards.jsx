import { Paper, Divider } from "@mui/material";
import Trophy from "../../assets/dashboard/Trophy.png";
import medalGold from "../../assets/dashboard/Medal_gold.png";
import medalSilver from "../../assets/dashboard/Medal_silver.png";
import medalBronze from "../../assets/dashboard/Medal_bronze.png";

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
          <span className="pl-3 text-secondary-600">
            points until next level
          </span>
          <span className="pl-3 text-secondary-600">likes received</span>
          <span className="pl-3 text-secondary-600">comments received</span>
        </div>
      </Paper>
      {/* Team activity card */}
      <Paper elevation={3} className="h-80 w-56 rounded-2xl">
        <div className="flex flex-col">
          <h3 className="text-black text-lg md:text-xl lg:text-2xl px-5 pt-6 text-center">
            Team activity
          </h3>
          <div className="flex items-center justify-center">
            <Paper elevation={3} className="h-20 w-20 rounded-full">
              <span className="text-primary-900 text-4xl font-bold flex items-center justify-center">
                10
              </span>
            </Paper>
          </div>
          <span className="pl-3 text-secondary-600">
            ideas created on Cruzzle
          </span>
        </div>
      </Paper>
    </div>
  );
}

export default InspirationCards;
