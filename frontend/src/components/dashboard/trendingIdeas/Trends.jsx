import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchAll } from "../../../services/api.services";
import IdeaDisplayer from "../../idea/IdeaDisplayer";

function Trends() {
  const { t } = useTranslation();
  const [trendIdeas, setTrendIdeas] = useState();

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
      <h4 className="pl-5 text-black">{t("pages.home.dashboard.trends")}</h4>
      <div className="overflow-y-auto h-96">
        {trendIdeas !== undefined ? (
          <IdeaDisplayer ideas={trendIdeas} isMini />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Trends;
