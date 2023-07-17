import { useContext, useEffect, useState } from "react";

import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import FilterbarFavorites from "../../components/Favorites/filters/FilterbarFavorites";
import { UserContext } from "../../contexts/UserContext";
import { FilterFavoritesContext } from "../../contexts/FilterFavoritesContext";
import { fetchByQuery, fetchAll } from "../../services/api.services";

function Favorits() {
  const [trendIdeas, setTrendIdeas] = useState();
  const { user } = useContext(UserContext);
  const {
    id: userId,
    agency: { id: userAgencyId },
  } = user;

  const {
    update,
    setUpdate,
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
    favoritesFiltered,
    setFavoritesFiltered,
  } = useContext(FilterFavoritesContext);

  useEffect(() => {
    const reqItems = {
      userId,
      userAgencyId,
      publicationDateStart,
      publicationDateEnd,
      autorSelectionTag,
      selectedCategories,
      trendingTag,
      titleContains,
      hasAttachment,
      hasNoComment,
    };
    fetchByQuery("/api/favorits/filter", reqItems)
      .then((data) => {
        const favoritArray = [];
        data.map((item) => favoritArray.push(item.idea));

        setFavoritesFiltered(favoritArray);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, [
    update,
    userId,
    userAgencyId,
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  ]);

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
    <div className="ideas-page w-full flex flex-col">
      <header className="w-full px-6 sticky top-[66px] z-50 xl:w-8/12 sm:top-[62px] bg-white">
        <h2>Your Favorites</h2>
        <FilterbarFavorites />
      </header>
      <div className="ideas-header flex flex-row ">
        <main className="ideas-main w-full xl:w-8/12">
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
        <aside className="w-4/12 hidden pl-4 pr-4 xl:inline xl:sticky xl:top-[62px] xl:right-0 xl:h-min">
          <h3>Trends</h3>
          {trendIdeas ? <IdeaDisplayer ideas={trendIdeas} /> : ""}
        </aside>
      </div>
    </div>
  );
}
export default Favorits;
