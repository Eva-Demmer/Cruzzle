import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import { UserProfileContext } from "../../contexts/UserProfile";
import logoMobile from "../../assets/logo/logoMobile.svg";
import { apiGeActivitiesByUserId } from "../../services/api.users";

export default function ActivityTab() {
  const { user } = useContext(UserProfileContext);
  const [userActivities, setUserActivities] = useState("");

  useEffect(() => {
    apiGeActivitiesByUserId(user.id)
      .then((res) => setUserActivities(res))
      .catch((err) => console.error(err));
  }, []);

  const likedAtList =
    userActivities &&
    userActivities.idea_like.map((item) => ({
      type: "like",
      title: item.idea.title,
      liked_at_day: dayjs(item.liked_at).locale("fr").format("DD/MM/YYYY"),
      liked_at_time: dayjs(item.liked_at).locale("fr").format("HH:mm"),
    }));

  const commentAtList =
    userActivities &&
    userActivities.comment.map((item) => ({
      type: "comment",
      title: item.idea.title,
      liked_at_day: dayjs(item.created_at).locale("fr").format("DD/MM/YYYY"),
      liked_at_time: dayjs(item.created_at).locale("fr").format("HH:mm"),
    }));

  const combinedList = [...likedAtList, ...commentAtList];

  const sortedList = combinedList.sort((a, b) => {
    const dateA = new Date(dayjs(a.liked_at_day, "DD/MM/YYYY").toDate());
    const dateB = new Date(dayjs(b.liked_at_day, "DD/MM/YYYY").toDate());
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
    return 0;
  });

  let lastDate = userActivities && sortedList[0].liked_at_day;

  return (
    <List className="w-full overflow-y-auto">
      {userActivities &&
        sortedList.map((item, index) => {
          const currentDate = item.liked_at_day;
          let divider = null;
          let displayDate = currentDate;
          if (index === 0 || currentDate !== lastDate) {
            if (dayjs(currentDate, "DD/MM/YYYY").isSame(dayjs(), "day")) {
              displayDate = "Today";
            } else if (
              dayjs(currentDate, "DD/MM/YYYY").isSame(
                dayjs().subtract(1, "day"),
                "day"
              )
            ) {
              displayDate = "Yesterday";
            }
            divider = (
              <Divider>
                <Chip
                  label={displayDate}
                  className="bg-white border border-gray-400 border-solid font-bold text-lg p-1"
                />
              </Divider>
            );
          }

          lastDate = currentDate;

          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${item.id}_${index}`} className="flex flex-col">
              {divider}
              <ListItem alignItems="flex-start" className="items-center">
                <div className="flex flex-col">
                  <div className="flex align-items-center">
                    <div className="flex flex-col">
                      <ListItemAvatar>
                        <Avatar alt="avatar user" src={user.avatar_url} />
                      </ListItemAvatar>
                      {index !== sortedList.length - 1 && (
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
                          {user.firstname} {user.lastname}
                        </b>{" "}
                        {item.type === "like" ? (
                          <>
                            liked &#128077; in <b>{item.title}</b> idea.
                          </>
                        ) : (
                          <>
                            added a comment in <b>{item.title}</b> idea.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-600 pl-16 flex items-center">
                    <img
                      src={logoMobile}
                      alt="Logo"
                      className="inline-block mr-1 w-5"
                    />{" "}
                    {item.liked_at_time}
                  </p>
                </div>
              </ListItem>
            </div>
          );
        })}
    </List>
  );
}
