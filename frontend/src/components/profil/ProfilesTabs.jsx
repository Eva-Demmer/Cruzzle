/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { LightBulbIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import TabPanel from "../tabs/TabPanel";
import AllyProps from "../tabs/AllyProps";
import { UserContext } from "../../contexts/UserContext";
import PuzzleIcon from "../../assets/PuzzleIcon.svg";

export default function ProfilesTabs() {
  const {
    biography,
    score_comment,
    score_idea,
    score_like,
    position_id,
    agency_id,
    mail,
    birthdate,
    phone,
    joined_at,
  } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userinfos = [
    {
      title: "Title",
      content: position_id,
    },
    {
      title: "Agency",
      content: agency_id,
    },
    {
      title: "Email",
      content: mail,
    },
    {
      title: "Birthday",
      content: birthdate,
    },
    {
      title: "Phone",
      content: phone,
    },
    {
      title: "Joined Company",
      content: joined_at,
    },
  ];

  return (
    <div className="my-8" aria-label="Context">
      <Box className="my-4 w-full">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="General" {...AllyProps(0)} />
            <Tab label="Activity" {...AllyProps(1)} />
            <Tab label="Contributions" {...AllyProps(2)} />
            <Tab label="Puzzles" {...AllyProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className="w-full">
          <div className="flex flex-col md:flex-row gap-5 relative">
            <div className="w-4/5 md:w-2/3">
              <h3 className="text-black">About me</h3>
              <p className="text-base mb-5  text-secondary-600">{biography}</p>
              <h3 className="text-black mb-5">Overview</h3>
              <div className="flex flex-col lg:flex-row gap-7">
                <div className="h-30 w-60 shadow-md rounded-2xl flex flex-col relative">
                  <img
                    className="h-10 w-10 absolute top-[-18px] left-[-18px]"
                    alt=""
                    src={PuzzleIcon}
                  />
                  <h3 className="text-black ml-5 mt-2">Finished puzzles</h3>
                  <h2 className="text-black text-5xl ml-5 mb-5">
                    {score_comment}
                  </h2>
                </div>
                <div className="h-30 w-60 shadow-md rounded-2xl flex flex-col relative">
                  <LightBulbIcon className="h-10 w-10 absolute top-[-18px] left-[-18px] text-primary-900 fill-current transform rotate-45" />
                  <h3 className="text-black ml-5 mt-2">Total ideas</h3>
                  <h2 className="text-black text-5xl ml-5 mb-5">
                    {score_idea}
                  </h2>
                </div>
                <div className="h-30 w-60 shadow-md rounded-2xl flex flex-col relative">
                  <SquaresPlusIcon className="h-10 w-10 absolute top-[-18px] left-[-18px] text-primary-900 fill-current" />
                  <h3 className="text-black ml-5 mt-2">Participations</h3>
                  <h2 className="text-black text-5xl ml-5 mb-5">
                    {score_like}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col relative">
              {userinfos.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <h4 className="text-black text-base">{item.title}</h4>
                  <p className="text-base text-secondary-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} className="w-full">
          à remplir
        </TabPanel>
        <TabPanel value={value} index={2} className="w-full">
          à remplir
        </TabPanel>
        <TabPanel value={value} index={3} className="w-full">
          à remplir
        </TabPanel>
      </Box>
    </div>
  );
}
