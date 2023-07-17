import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../contexts/UserProfile";
import { apiGeContributionsByUserId } from "../../services/api.users";
import ContributionCard from "./ContributionCard";

export default function ContributionsTabs() {
  const { user } = useContext(UserProfileContext);
  const [userContributions, setUserContributions] = useState("");

  useEffect(() => {
    apiGeContributionsByUserId(user.id)
      .then((res) => {
        const groupedArrays = [];
        let currentGroup = [];
        res.forEach((obj, index) => {
          const createdAt = obj.created_at;
          if (index > 0 && createdAt !== res[index - 1].created_at) {
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
      {userContributions &&
        userContributions.map((item) => (
          <ContributionCard ideas={item} key={item[0].created_at} />
        ))}
    </div>
  );
}
