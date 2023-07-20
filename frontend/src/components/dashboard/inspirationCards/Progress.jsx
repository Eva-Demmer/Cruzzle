import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { HalfCircleProgress, pointsNextLevel } from "./HalfCircleProgress";
import { UserContext } from "../../../contexts/UserContext";
import { apiGetTotalLikesReceivedByUserId } from "../../../services/api.ideaLikes";
import { apiGetTotalCommentsReceivedByUserId } from "../../../services/api.comments";

function Progress() {
  const { t } = useTranslation();
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const { user } = useContext(UserContext);
  const { id } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalLikesResponse = await apiGetTotalLikesReceivedByUserId(id);
        setTotalLikes(totalLikesResponse.data);

        const totalCommentsResponse = await apiGetTotalCommentsReceivedByUserId(
          id
        );
        setTotalComments(totalCommentsResponse.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching total likes or comments data:",
          error
        );
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <div id="progress-bar" className="w-full flex flex-col items-center">
        <div id="progress-animation" className="flex flex-col">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <HalfCircleProgress />
            </div>
            <span className="text-3xl mt-6 pt-3 flex">{pointsNextLevel}</span>
          </div>
        </div>
        <span className="pl-3 pb-3 xl:px-2 text-secondary-600">
          {t("pages.home.inspirationCards.pointsNextLevel")}
        </span>
      </div>
      <div
        id="likes-and-comments-received"
        className="w-full h-full flex flex-col justify-around xl:justify-between"
      >
        <div id="likes-received" className="w-full flex justify-center">
          <div className="flex flex-col justify-center items-center relative">
            <HandThumbUpIcon className="w-20 xl:w-14 text-primary-50 absolute top-[-14px] opacity-10" />
            <span className="text-4xl xl:text-2xl">{totalLikes}</span>
            <span className="pl-3 text-secondary-600">
              {t("pages.home.inspirationCards.likesReceived")}
            </span>
          </div>
        </div>
        <div id="comments-received" className="w-full flex justify-center">
          <div className="flex flex-col justify-center items-center relative">
            <ChatBubbleBottomCenterTextIcon className="w-16 xl:w-12 text-primary-50 absolute top-[-8px] opacity-10" />
            <span className="text-4xl xl:text-2xl">{totalComments}</span>
            <span className="pl-3 text-secondary-600">
              {t("pages.home.inspirationCards.commentsReceived")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Progress;
