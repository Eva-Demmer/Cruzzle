import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import Greeting from "../components/dashboard/Greeting";
import CategoryCard from "../components/dashboard/CategoryCards";
import OverviewCards from "../components/dashboard/OverviewCards";
import InspirationCards from "../components/dashboard/InspirationCards";
import IdeaDisplayer from "../components/idea/IdeaDisplayer";
import { apiCategoriesOrder } from "../services/api.categories";
import { fetchAll } from "../services/api.services";
import { xl } from "../utils/mediaQueries";

function Home() {
  const xlQuery = useMediaQuery(xl.query);
  const [categories, setCategories] = useState([]);
  const [trendIdeas, setTrendIdeas] = useState();

  const displayCategories = categories.slice(0, 5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiCategoriesOrder();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAll("/api/ideas/trends")
      .then((data) => {
        setTrendIdeas(data);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, []);

  return (
    <div>
      {/* desktop */}
      {xlQuery && (
        <div className="absolute top-0 h-screen flex">
          <div className="px-10 pb-10 pt-16 bg-primary-900 bg-opacity-5 flex flex-col justify-between">
            {/* Welcome */}
            <Greeting />
            {/* Categories */}
            <div className="">
              <div>
                <h4 className="pb-3 text-black">Top categories</h4>
                <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar">
                  {displayCategories.slice(0, 4).map((category) => {
                    return (
                      <CategoryCard
                        key={category.id}
                        categoryName={category.label}
                        categoryColor={category.color}
                      />
                    );
                  })}
                </div>
              </div>
              {/* Overview */}
              <div>
                <h4 className="mt-12 pb-5 text-black">Overview</h4>
                <OverviewCards />
              </div>
            </div>
          </div>
          <div className="px-10 bg-white flex flex-col items-end justify-between xl:pt-14">
            {/* Inspiration */}
            <div>
              <InspirationCards />
            </div>
            {/* Trending */}
            <div className="mt-16 xl:mt-3">
              <h4 className="pl-5 text-black">Trending ideas</h4>
              <div className="overflow-y-auto h-96">
                {trendIdeas !== undefined ? (
                  <IdeaDisplayer ideas={trendIdeas} isMini />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* mobile */}
      {!xlQuery && (
        <div className="h-screen flex flex-col">
          <div className="p-5">
            {/* Welcome */}
            <Greeting />
            {/* Categories */}
            <h4 className="mt-12 pb-3 text-black">Top 5 categories</h4>
            <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar">
              {displayCategories.map((category) => {
                return (
                  <CategoryCard
                    key={category.id}
                    categoryName={category.label}
                    categoryColor={category.color}
                  />
                );
              })}
            </div>
            {/* Overview */}
            <h4 className="mt-10 pb-5 text-black">Overview</h4>
            <OverviewCards />
          </div>
          {/* Inspiration */}
          <div>
            <h4 className="mt-5 mb-2 px-5 text-black">Your stats</h4>
            <InspirationCards />
          </div>
          {/* Trending */}
          <div>
            <h4 className="pl-5 mt-10 pb-5 text-black">Trending ideas</h4>
            <div className="overflow-y-auto h-96">
              {trendIdeas !== undefined ? (
                <IdeaDisplayer ideas={trendIdeas} isMini />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
