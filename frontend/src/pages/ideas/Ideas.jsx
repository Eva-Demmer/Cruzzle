import { useContext, useEffect } from "react";

import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
import Filterbar from "../../components/filterbar/Filterbar";
import { UserContext } from "../../contexts/UserContext";
import { FilterContext } from "../../contexts/FilterContext";
import { fetchByQuery } from "../../services/api.services";

function Ideas() {
  const user = useContext(UserContext);
  const {
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  } = useContext(FilterContext);

  useEffect(() => {
    const { id: userId, agency_id: userAgencyId } = user;
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
    fetchByQuery("/api/ideas/filter", reqItems)
      .then((data) => console.info("Ideas filtred : ", data))
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, [
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  ]);

  return (
    <IdeasProvider>
      <div className="ideas-page w-full flex flex-col h-screen">
        <header className="w-full px-6 min-[1439px]:w-8/12">
          <h2>Ideas</h2>
          <Filterbar />
        </header>
        <div className="ideas-header flex flex-row ">
          <main className="ideas-main w-full min-[1439px]:w-8/12">
            <IdeaDisplayer isMini={false} />
          </main>
          <aside className="ideas-aside-right w-4/12 hidden pl-4 pr-4 min-[1439px]:inline-block">
            <h3>Tendences</h3>
            <IdeaDisplayer isMini="true" />
          </aside>
        </div>
      </div>
    </IdeasProvider>
  );
}
export default Ideas;
