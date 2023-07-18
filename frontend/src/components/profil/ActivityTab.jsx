import { useContext, useEffect, useState } from "react";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import { UserProfileContext } from "../../contexts/UserProfile";
import { apiGeActivitiesByUserId } from "../../services/api.users";
import ActivityCard from "./ActivityCard";
import NoActivities from "../../assets/no_activities.svg";

export default function ActivityTab() {
  const { user } = useContext(UserProfileContext);
  const [userActivities, setUserActivities] = useState("");

  useEffect(() => {
    apiGeActivitiesByUserId(user.id)
      .then((res) => {
        console.info("callapi", res);
        const groupedArrays = [];
        let currentGroup = [];
        res.forEach((obj, index) => {
          const createdAt = dayjs(obj.created_at).startOf("day");
          if (
            index > 0 &&
            !createdAt.isSame(dayjs(res[index - 1].created_at).startOf("day"))
          ) {
            groupedArrays.push(currentGroup);
            currentGroup = [];
          }
          currentGroup.push(obj);
        });
        groupedArrays.push(currentGroup);
        setUserActivities(groupedArrays);
        console.info("grouped", groupedArrays);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full">
      {userActivities && userActivities.length > 0 ? (
        userActivities.map((item) =>
          item[0]?.created_at ? (
            <ActivityCard activities={item} key={item[0].created_at} />
          ) : null
        )
      ) : (
        <div className="flex items-center justify-center h-screen">
          <img
            src={NoActivities}
            alt="no activities"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
}
