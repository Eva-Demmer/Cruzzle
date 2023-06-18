import FilterProvider from "../../contexts/FilterContext";
import Filterbar from "../../components/filterbar/Filterbar";

function Ideas() {
  return (
    <FilterProvider>
      <div className="ideas-page w-full">
        <header className="ideas-header w-full pl-6 min-[1439px]:w-4/6">
          <h2>Ideas</h2>
          <Filterbar />
        </header>
        <main className="ideas-main inline-block w-full min-[1439px]:w-4/6">
          main content
        </main>
        <aside className="ideas-aside-right w-2/6 pl-6 hidden min-[1439px]:inline-block">
          <h3>Tendences</h3>
        </aside>
      </div>
    </FilterProvider>
  );
}
export default Ideas;
