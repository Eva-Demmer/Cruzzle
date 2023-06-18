import FilterProvider from "../../contexts/FilterContext";
import Filterbar from "../../components/filterbar/Filterbar";

function Ideas() {
  return (
    <FilterProvider>
      <div className="ideas-page w-full">
        <header className="ideas-header w-full pl-6 min-[1235px]:w-3/4">
          <h2>Ideas</h2>
          <Filterbar />
        </header>
        <main className="ideas-main inline-block w-full min-[1235px]:w-3/4">
          main content
        </main>
        <aside className="ideas-aside-right w-1/4 pl-6 hidden min-[1235px]:inline-block">
          <h3>Tendences</h3>
        </aside>
      </div>
    </FilterProvider>
  );
}
export default Ideas;
