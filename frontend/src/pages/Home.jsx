/* eslint-disable camelcase */
// import { useState, useEffect, useContext } from "react";
// import { PencilIcon } from "@heroicons/react/24/solid";
// import { UserContext } from "../contexts/UserContext";
// import { apiIdeas } from "../services/api.ideas";
import OverviewCards from "../components/cards/OverviewCards";

function Home() {
  // const { id } = useContext(UserContext);
  // const [ideasCreatedToday, setIdeasCreatedToday] = useState(0);
  // const route = `${id}/count`;

  // useEffect(() => {
  //   const fetchIdeasCreatedToday = async () => {
  //     try {
  //       const response = await apiIdeas(route);
  //       setIdeasCreatedToday(response.count);
  //     } catch (error) {
  //       setIdeasCreatedToday("N/A");
  //       console.error("Error fetching ideas created today:", error);
  //     }
  //   };
  //   if (id) {
  //     fetchIdeasCreatedToday();
  //   }
  // }, [id]);

  // if (
  //   score_comment === undefined ||
  //   score_idea === undefined ||
  //   score_like === undefined
  // ) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <div className="h-screen p-5 lg:w-3/5 xl:w-2/5">
    //   <h3 className="text-black mb-5">Overview</h3>
    //   <div className="p-2">
    //     <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:gap-y-8 lg:gap-x-16">
    //       <OverviewCards />
    //       <div className="h-36 w-40 md:w-52 shadow-md rounded-2xl flex flex-col relative">
    //         <PencilIcon className="h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current" />
    //         <div className="flex flex-col justify-between h-full">
    //           <h3 className="text-black text-lg md:text-xl px-5 pt-5">
    //             Ideas created today
    //           </h3>
    //           <h2 className="text-black text-2xl md:text-3xl px-5 pb-5">
    //             {ideasCreatedToday}
    //           </h2>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="h-screen p-5">
      <OverviewCards />
    </div>
  );
}

export default Home;
