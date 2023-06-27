import { useContext } from "react";
import {
  LightBulbIcon,
  PencilIcon,
  SquaresPlusIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../contexts/UserContext";
import OverviewCards from "../components/OverviewCards";

function Home() {
  const { puzzlesFinished, totalIdeas, participations } =
    useContext(UserContext);
  return (
    <div>
      <h3 className="text-black mb-5">Overview</h3>
      <div className="w-1/2 grid grid-cols-2 gap-x-8 gap-y-12">
        <OverviewCards
          icon={TrophyIcon}
          title="Finished puzzles"
          value={puzzlesFinished}
        />
        <OverviewCards
          icon={LightBulbIcon}
          title="Total ideas"
          value={totalIdeas}
        />
        <OverviewCards
          icon={SquaresPlusIcon}
          title="Participations"
          value={participations}
        />
        <div className="h-32 w-68 shadow-md rounded-2xl flex flex-col relative">
          <PencilIcon className="h-10 w-10 absolute top-[-18px] left-[-18px] text-primary-900 fill-current" />
          <div className="m-5">
            <h3 className="text-black">Ideas created today</h3>
            <h2 className="text-black text-4xl">?</h2>{" "}
            {/* TODO: Replace with real value --> axios call */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
