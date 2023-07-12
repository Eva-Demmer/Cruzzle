import { useContext, useEffect, useState } from "react";

import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
import FilterbarFavorites from "../../components/Favorites/filters/FilterbarFavorites";
import { UserContext } from "../../contexts/UserContext";
import { FilterFavoritesContext } from "../../contexts/FilterFavoritesContext";
import { fetchByQuery, fetchAll } from "../../services/api.services";

function Favorits() {
  const [trendIdeas, setTrendIdeas] = useState();
  const { user } = useContext(UserContext);
  const { id: userId } = user;

  const {
    update,
    setUpdate,
    // autorSelectionTag,
    // selectedCategories,
    // trendingTag,
    // titleContains,
    // hasAttachment,
    // hasNoComment,
    favoritesFiltered,
    setFavoritesFiltered,
  } = useContext(FilterFavoritesContext);

  useEffect(() => {
    const reqItems = {
      userId,
      // autorSelectionTag,
      // selectedCategories,
      // trendingTag,
      // titleContains,
      // hasAttachment,
      // hasNoComment,
      // favoritesFiltered,
    };

    fetchByQuery("/api/favorits/filter", reqItems)
      .then((data) => {
        console.info("data", data);
        const favoritArray = [];
        data.map((item) => favoritArray.push(item.idea));

        setFavoritesFiltered(favoritArray);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, [update]);

  useEffect(() => {
    console.info("favorites changed", favoritesFiltered);
  }, [favoritesFiltered]);

  useEffect(() => {
    console.info("trends changed", trendIdeas);
  }, [favoritesFiltered]);

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
    <IdeasProvider>
      <div className="ideas-page w-full flex flex-col h-screen">
        <header className="w-full px-6 min-[1439px]:w-8/12">
          <h2>Your Favorites</h2>
          <FilterbarFavorites />
        </header>
        <div className="ideas-header flex flex-row ">
          <main className="ideas-main w-full min-[1439px]:w-8/12">
            {favoritesFiltered ? (
              <IdeaDisplayer
                setUpdate={setUpdate}
                ideas={favoritesFiltered}
                isMini={false}
              />
            ) : (
              ""
            )}
          </main>
          <aside className="ideas-aside-right w-4/12 hidden pl-4 pr-4 min-[1439px]:inline-block">
            <h3>Trends</h3>
            {trendIdeas !== undefined ? (
              <IdeaDisplayer ideas={trendIdeas} isMini="true" />
            ) : (
              ""
            )}
          </aside>
        </div>
      </div>
    </IdeasProvider>
  );
}
export default Favorits;
