import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CategoryCards from "../components/cards/CategoryCards";
import OverviewCards from "../components/cards/OverviewCards";
import InspirationCards from "../components/cards/InspirationCards";
import { apiCategoriesOrder } from "../services/api.categories";

function Home() {
  const [categories, setCategories] = useState([]);

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

  const displayCategories = categories.slice(0, 5);

  return (
    <div className="h-screen bg-primary-900 bg-opacity-5 flex justify-between">
      <div className="p-10">
        {/* Welcome */}
        <div className="flex flex-col">
          <span className="text-5xl font-semibold">Good morning,</span>
          <span className="text-5xl font-semibold">John</span>
          <p className="my-8">
            Here you can track your activity and find ideas!
          </p>
          <div className="flex gap-10">
            <Button variant="contained" className="rounded-full bg-black">
              See suggestions
            </Button>
            <Button variant="contained" className="rounded-full">
              Create idea
            </Button>
          </div>
        </div>
        {/* Categories */}
        <h4 className="mt-12 pb-3 text-black">Categories</h4>
        <div className="flex flex-row gap-4">
          {displayCategories.map((category) => (
            <CategoryCards
              key={category.id}
              categoryName={category.label}
              categoryColor={category.color}
            />
          ))}
        </div>
        {/* Overview */}
        <h4 className="mt-10 pb-5 text-black">Overview</h4>
        <OverviewCards />
      </div>
      {/* Inspiration */}
      <div className="h-screen bg-white pt-20 pr-10">
        <div className="ml-[-180px]">
          <InspirationCards />
        </div>
      </div>
    </div>
  );
}

export default Home;
