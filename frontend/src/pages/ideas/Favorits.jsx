import { useContext, useEffect, useState } from "react";

import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
import Filterbar from "../../components/filterbar/Filterbar";
import { UserContext } from "../../contexts/UserContext";
// import { FilterContext } from "../../contexts/FilterContext";
import { fetchByQuery, fetchAll } from "../../services/api.services";

function Favorits() {
  const [favorites, setFavorites] = useState();
  const [trendIdeas, setTrendIdeas] = useState();
  const { user } = useContext(UserContext);
  const { id: userId } = user;

  useEffect(() => {
    const reqItems = {
      userId,
    };

    fetchByQuery("/api/favorits/filter", reqItems)
      .then((data) => {
        console.info("data", data);
        const favoritArray = [];
        data.map((item) => favoritArray.push(item.idea));

        setFavorites(favoritArray);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, []);

  useEffect(() => {
    console.info("favorites changed", favorites);
  }, [favorites]);

  useEffect(() => {
    console.info("trends changed", trendIdeas);
  }, [favorites]);

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
          <h2>Ideas</h2>
          <Filterbar />
        </header>
        <div className="ideas-header flex flex-row ">
          <main className="ideas-main w-full min-[1439px]:w-8/12">
            {favorites ? (
              <IdeaDisplayer ideas={favorites} isMini={false} />
            ) : (
              ""
            )}
          </main>
          <aside className="ideas-aside-right w-4/12 hidden pl-4 pr-4 min-[1439px]:inline-block">
            <h3>Tendences</h3>
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
