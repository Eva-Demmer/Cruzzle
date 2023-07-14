import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
import Filterbar from "../../components/filterbar/Filterbar";
import { UserContext } from "../../contexts/UserContext";
import { FilterContext } from "../../contexts/FilterContext";
import { fetchByQuery, fetchAll } from "../../services/api.services";

function Ideas() {
  const { t } = useTranslation();
  const [filteredIdeas, setFilteredIdeas] = useState();
  const [trendIdeas, setTrendIdeas] = useState();
  const { user } = useContext(UserContext);
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

  const {
    id: userId,
    agency: { id: userAgencyId },
  } = user;

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
    fetchByQuery("/api/ideas/filter", reqItems)
      .then((data) => {
        setFilteredIdeas(data);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, [
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
    <IdeasProvider>
      <div className="ideas-page w-full flex flex-col h-screen">
        <header className="w-full px-6 min-[1439px]:w-8/12">
          <h2>{t("pages.ideas.ideaspage.title")}</h2>
          <Filterbar />
        </header>
        <div className="ideas-header flex flex-row ">
          <main className="ideas-main w-full min-[1439px]:w-8/12">
            {filteredIdeas && (
              <IdeaDisplayer ideas={filteredIdeas} isMini={false} />
            )}
          </main>
          <aside className="ideas-aside-right w-4/12 hidden pl-4 pr-4 min-[1439px]:inline-block">
            <h3>{t("pages.ideas.ideaspage.tendences")}</h3>
            {trendIdeas && <IdeaDisplayer ideas={trendIdeas} />}
          </aside>
        </div>
      </div>
    </IdeasProvider>
  );
}
export default Ideas;
