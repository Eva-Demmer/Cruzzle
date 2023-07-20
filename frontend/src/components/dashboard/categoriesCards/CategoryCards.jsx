import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { xl } from "../../../utils/mediaQueries";
import { apiCategoriesOrder } from "../../../services/api.categories";
import CategoryCard from "./IndividualCategoryCard";

function CategoryCards() {
  const xlQuery = useMediaQuery(xl.query);
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
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

  return (
    <>
      {xlQuery && (
        <>
          <h4 className="text-black">
            {t("pages.home.dashboard.topCategories")}
          </h4>
          <div className="flex flex-row gap-4">
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
        </>
      )}
      {!xlQuery && (
        <>
          <h4 className="text-black">
            {t("pages.home.dashboard.top5Categories")}
          </h4>
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
        </>
      )}
    </>
  );
}

export default CategoryCards;
