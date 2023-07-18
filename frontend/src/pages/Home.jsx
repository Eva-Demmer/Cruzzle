import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, useMediaQuery } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import CategoryCard from "../components/cards/CategoryCards";
import OverviewCards from "../components/cards/OverviewCards";
import InspirationCards from "../components/cards/InspirationCards";
import IdeaDisplayer from "../components/idea/IdeaDisplayer";
import { apiCategoriesOrder } from "../services/api.categories";
import { fetchAll } from "../services/api.services";
import { xl } from "../utils/mediaQueries";

function Home() {
  const xlQuery = useMediaQuery(xl.query);
  const [categories, setCategories] = useState([]);
  const [trendIdeas, setTrendIdeas] = useState();
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("Welcome back");
  const { user } = useContext(UserContext);
  const { firstname } = user;
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

    const hour = new Date().getHours();
    let updatedGreeting;

    if (hour < 12) {
      updatedGreeting = "Good morning";
    } else if (hour < 18) {
      updatedGreeting = "Good afternoon";
    } else {
      updatedGreeting = "Good evening";
    }
    setGreeting(updatedGreeting);
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
        <div className="absolute top-0 h-screen w-7/12 bg-primary-900 bg-opacity-5 flex justify-between">
          <div className="mt-5 p-10 w-full">
            {/* Welcome */}
            <div className="flex flex-col">
              <span className="text-4xl xl:text-3xl xxl:mr-20 font-semibold">
                {greeting},
              </span>
              <span className="pt-4 xl:pt-2 text-4xl xl:text-3xl xxl:text-6xl font-semibold">
                {firstname}
              </span>
              <p className="mt-6 mb-8 xl:mt-4 xl:mb-6 xxl:mt-6 xxl:mb-8">
                Here you can track your activity and find ideas!
              </p>
              <div className="flex gap-6">
                <Button
                  variant="contained"
                  onClick={() => navigate("/ideas")}
                  className="rounded-full bg-black"
                >
                  See suggestions
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/ideas/new")}
                  className="rounded-full"
                >
                  Create idea
                </Button>
              </div>
            </div>
            {/* Categories */}
            <h4 className="mt-20 pb-3 text-black">Top categories</h4>
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
            {/* Overview */}
            <h4 className="mt-10 xl:mt-6 xxl:mt-10 pb-5 text-black">
              Overview
            </h4>
            <OverviewCards />
          </div>
          <div className="px-10 h-screen bg-white flex flex-col xl:pt-14 xxl:mt-16">
            {/* Inspiration */}
            <div>
              <InspirationCards />
            </div>
            {/* Trending */}
            <div className="mt-16 xl:mt-3 xxl:mt-16">
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
            <div className="flex flex-col">
              <span className="text-4xl font-semibold">{greeting},</span>
              <span className="pt-4 text-4xl font-semibold">{firstname}</span>
              <p className="mt-6 mb-8">
                Here you can track your activity and find ideas!
              </p>
              <div className="flex gap-5">
                <Button
                  variant="contained"
                  onClick={() => navigate("/ideas")}
                  className="rounded-full bg-black"
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  See suggestions
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/ideas/new")}
                  className="rounded-full"
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  Create idea
                </Button>
              </div>
            </div>
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
