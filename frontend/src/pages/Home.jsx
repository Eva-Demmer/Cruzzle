import InspirationCards from "../components/cards/InspirationCards";
import OverviewCards from "../components/cards/OverviewCards";

function Home() {
  return (
    <div className="h-screen p-5">
      <InspirationCards />
      <OverviewCards />
    </div>
  );
}

export default Home;
