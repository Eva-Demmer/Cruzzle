import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
// import AddTeamToPdcButton from "../../components/AddTeamToPdcButton";

function Ideas() {
  return (
    <IdeasProvider>
      <div className="ideas-page w-full">
        <header className="ideas-header w-full pl-6 min-[1439px]:w-4/6">
          <h2>Ideas</h2>
        </header>
        <main className="ideas-main inline-block w-full min-[1439px]:w-4/6">
          <IdeaDisplayer isMini={false} />
        </main>
        <aside className="ideas-aside-right w-2/6 pl-6 hidden min-[1439px]:inline-block">
          <h3>Tendences</h3>
          <IdeaDisplayer isMini="true" />
        </aside>
      </div>
    </IdeasProvider>
  );
}
export default Ideas;
