import { useMediaQuery } from "@mui/material";
import Greeting from "../components/dashboard/greeting/Greeting";
import CategoryCards from "../components/dashboard/categoriesCards/CategoryCards";
import OverviewCards from "../components/dashboard/overviewCards/OverviewCards";
import InspirationCards from "../components/dashboard/inspirationCards/InspirationCards";
import TrendCards from "../components/dashboard/trendingIdeas/Trends";
import { xl } from "../utils/mediaQueries";

function Home() {
  const xlQuery = useMediaQuery(xl.query);

  return (
    <div>
      {xlQuery && (
        <div
          id="dashboard-desktop"
          className="mt-[-62px] h-screen w-full p-10 flex flex-col justify-around relative"
        >
          <div
            id="background"
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-purple-100"
          />
          <div id="top" className="flex gap-5 w-full pt-5 z-10">
            <div id="greeting" className="w-full">
              <Greeting />
            </div>
            <div
              id="inspiration"
              className="w-full h-[250px] xl:-mb-5 xl:-ml-36"
            >
              <InspirationCards />
            </div>
          </div>
          <div id="bottom" className="flex gap-5 w-full z-10">
            <div id="bottom-left" className="flex flex-col gap-5 w-full">
              <div id="categories" className="w-full">
                <CategoryCards />
              </div>
              <div id="overview" className="w-full">
                <OverviewCards />
              </div>
            </div>
            <div id="bottom-right-trends" className="w-full">
              <TrendCards />
            </div>
          </div>
        </div>
      )}

      {!xlQuery && (
        <div id="dashboard-mobile" className="w-full p-5 flex flex-col gap-10">
          <div id="greeting" className="w-full">
            <Greeting />
          </div>
          <div id="categories" className="w-full">
            <CategoryCards />
          </div>
          <div id="overview" className="w-full">
            <OverviewCards />
          </div>
          <div id="inspiration" className="w-full">
            <InspirationCards />
          </div>
          <div id="bottom-right-trends" className="w-full">
            <TrendCards />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
