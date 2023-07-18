import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { UserProfileContext } from "../../contexts/UserProfile";
import { apiGeContributionsByUserId } from "../../services/api.users";
import ContributionCard from "./ContributionCard";
import NoActivities from "../../assets/no_activities.svg";

export default function ContributionsTabs() {
  const { user } = useContext(UserProfileContext);
  const [userContributions, setUserContributions] = useState("");

  useEffect(() => {
    apiGeContributionsByUserId(user.id)
      .then((res) => {
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
        setUserContributions(groupedArrays);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full">
      {userContributions && userContributions.length > 0 ? (
        userContributions.map((item) => (
          <ContributionCard ideas={item} key={item[0].created_at} />
        ))
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
