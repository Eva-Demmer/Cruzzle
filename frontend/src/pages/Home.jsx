/* eslint-disable camelcase */
import { useState, useEffect, useContext } from "react";
import {
  LightBulbIcon,
  PencilIcon,
  SquaresPlusIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../contexts/UserContext";
import { apiIdeas } from "../services/api.ideas";
import { apiUserById } from "../services/api.users";
import OverviewCards from "../components/OverviewCards";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [ideasCreatedToday, setIdeasCreatedToday] = useState();
  const [payload, setPayload] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const parts = token.split(".");
        setPayload(JSON.parse(atob(parts[1])));
      } catch (error) {
        console.info("error token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (payload) {
      apiUserById(payload.id)
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
          } else {
            console.error("cannot get user by id");
          }
        })
        .catch((err) => {
          console.error("error get user by id", err);
        });
    }
  }, [payload]);

  useEffect(() => {
    const fetchIdeasCreatedToday = async () => {
      try {
        const response = await apiIdeas(`${user.id}/count`);
        setIdeasCreatedToday(response.count);
      } catch (error) {
        setIdeasCreatedToday("N/A");
        console.error("Error fetching ideas created today:", error);
      }
    };
    if (user.id) {
      fetchIdeasCreatedToday();
    }
  }, [user.id]);

  return (
    <div className="h-screen p-5 lg:w-3/5 xl:w-2/5">
      <h3 className="text-black mb-5">Overview</h3>
      <div className="p-2">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:gap-y-8 lg:gap-x-16">
          <OverviewCards
            icon={TrophyIcon}
            title="Finished puzzles"
            value={10}
          />
          <OverviewCards icon={LightBulbIcon} title="Total ideas" value={10} />
          <OverviewCards
            icon={SquaresPlusIcon}
            title="Participations"
            value={10}
          />
          <div className="h-36 w-40 md:w-52 shadow-md rounded-2xl flex flex-col relative">
            <PencilIcon className="h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current" />
            <div className="flex flex-col justify-between h-full">
              <h3 className="text-black text-lg md:text-xl px-5 pt-5">
                Ideas created today
              </h3>
              <h2 className="text-black text-2xl md:text-3xl px-5 pb-5">
                {ideasCreatedToday}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
