import React, { useContext } from "react";
import { Avatar, Chip, Divider, ListItemAvatar } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import logoMobile from "../../assets/logo/logoMobile.svg";
import { UserProfileContext } from "../../contexts/UserProfile";

function ActivityCard({ activities }) {
  const { user } = useContext(UserProfileContext);
  const { avatar_url: avatarUrl, firstname, lastname } = user;

  const { created_at: createdAt } = activities[0];

  let displayDate;
  if (
    dayjs(createdAt, "DD/MM/YYYY").isSame(dayjs().subtract(0, "day"), "day")
  ) {
    displayDate = "Today";
  } else if (
    dayjs(createdAt, "DD/MM/YYYY").isSame(dayjs().subtract(1, "day"), "day")
  ) {
    displayDate = "Yesterday";
  } else {
    displayDate = dayjs(createdAt).locale("fr").format("DD/MM/YYYY");
  }
  return (
    <div className="my-4 w-full">
      <Divider>
        <Chip
          label={displayDate}
          className="bg-white border border-gray-400 border-solid font-bold text-lg p-1"
        />
      </Divider>
      {activities &&
        activities.map((item, index) => {
          return (
            <div
              key={`${item.id || index}`}
              className="flex flex-col w-full mt-2"
            >
              <div className="w-full md:pl-6">
                <div className="flex flex-col w-full">
                  <div className="flex align-items-center w-full">
                    <div className="flex flex-col">
                      <ListItemAvatar>
                        <Avatar alt="avatar user" src={avatarUrl} />
                      </ListItemAvatar>
                      {activities.length - 1 !== index && (
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          className="h-7 absolute left-9 top-14 z-10"
                        />
                      )}
                    </div>
                    <div className="flex items-center">
                      <p className="text-base text-secondary-600">
                        <b>
                          {firstname} {lastname}
                        </b>{" "}
                        {item.type === "liked"
                          ? "liked \u{1F44D} in"
                          : "added comment to"}{" "}
                        <b>{item.title}</b> idea.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-600 xl:pl-16 md:pl-14 pl-14 flex items-center mb-4">
                    <img
                      src={logoMobile}
                      alt="Logo"
                      className="inline-block mr-1 w-5"
                    />{" "}
                    {dayjs(item.created_at).locale("fr").format("HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

ActivityCard.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ActivityCard;
