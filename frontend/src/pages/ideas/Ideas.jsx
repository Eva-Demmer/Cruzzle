import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
import FilterProvider from "../../contexts/FilterContext";
import Filterbar from "../../components/filterbar/Filterbar";

function Ideas() {
  return (
    <FilterProvider>
      <IdeasProvider>
        <div className="ideas-page w-full flex flex-col h-screen">
          <header className="w-full px-6 min-[1439px]:w-8/12 bg-white">
            <h2>Ideas</h2>
            <Filterbar />
          </header>
          <div className="ideas-header flex flex-row">
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
    </FilterProvider>
  );
}
export default Ideas;
