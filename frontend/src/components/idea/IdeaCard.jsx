/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import dayjs from "dayjs";
import IdeaCardActions from "./IdeaCardActions";
import { UserContext } from "../../contexts/UserContext";
import { IdeaPropTypes } from "../propTypes/ideaPropTypes";
import CustomChip from "../styledComponents/CustomChip";
import { apiUpdateIdeaLike } from "../../services/api.ideas";

export default function IdeaCard({ isMini, idea }) {
  const { id: userId } = useContext(UserContext);
  const {
    id,
    title,
    context,
    user,
    created_at: createdAt,
    archived_at: archivedAt,
    deleted_at: deletedAt,
    favorit,
    idea_category: ideaCategory,
    _count: count,
    views,
    idea_teams: ideaTeams,
    primary_img: primaryImg,
  } = idea;

  const navigate = useNavigate();
  const date = dayjs(createdAt).format("DD/MM/YYYY");
  const isFavorite = favorit.some((item) => item.user_id === userId);
  const isDisabled = archivedAt !== null || deletedAt !== null;
  const incViews = views + 1;

  const handleNavigate = () => {
    apiUpdateIdeaLike(id, incViews);
    navigate(`/ideas/${id}`);
  };

  return (
    <div
      className={`${
        isMini
          ? "max-w-xl py-1 border-solid border-primary-50 border-4 border-t-0 border-b-0 border-r-0"
          : "max-w-6xl min-w-[250px]"
      }
      ${isDisabled ? "opacity-50 hover:opacity-90" : ""}
       flex shadow-lg bg-white duration-100 rounded-xl group hover:bg-primary-70 sm:flex-row relative`}
    >
      <Link
        className="flex flex-col no-underline w-full sm:flex-row"
        onClick={handleNavigate}
      >
        <div
          className={`${
            isMini
              ? "hidden"
              : "w-full h-32 bg-cover bg-center opacity-100  duration-100 rounded-t-xl sm:h-auto sm:w-1/4 sm:rounded-l-xl sm:rounded-r-none"
          }
          ${isDisabled ? "" : "group-hover:opacity-90"}
          `}
          style={{
            backgroundImage: `url(${primaryImg})`,
          }}
        />
        <div className={`${isMini ? "w-auto" : "max-w-4xl sm:w-3/4"} pl-6 p-4`}>
          <div className="flex items-center gap-2 mb-3 justify-start">
            {ideaCategory.map((tag) => (
              <CustomChip
                key={`${tag.category.id}-${tag.category.label}`}
                label={tag.category.label}
                colorchoice={tag.category.color}
              />
            ))}
          </div>
          <h2
            className={`${isMini ? "font-normal text-base" : "text-black"}
              mr-8 text-lg font-medium no-underline max-w-xl line-clamp-1 pb-0
             `}
          >
            {title}
          </h2>

          <p
            className={`${isMini ? "text-gray-400" : "text-gray-600"}
              mr-8 mt-2 line-clamp-2
            `}
          >
            {context}
          </p>
          {!isMini && (
            <div className="flex items-center mt-6 sm:mt-4 text-gray-400 ">
              <div className="hidden text-sm md:flex flex-1">
                <span className="mr-1">Date : </span>
                <span className="font-bold">{date}</span>
              </div>
              <Stack direction="row" className="items-center flex-1">
                <span className="text-sm mr-1">Status : </span>
                <Chip
                  label={archivedAt || deletedAt ? "Closed" : "On progress"}
                  size="small"
                  variant="filled"
                  className={
                    archivedAt || deletedAt ? "bg-slate-200" : "bg-green-200"
                  }
                />
              </Stack>
              <div className="text-sm">
                <span className="font-bold mr-1">{count.comment}</span>
                <span>replies</span>
              </div>
              <Stack
                direction="row"
                className="hidden items-center lg:flex flex-1 justify-end"
              >
                <span className="text-sm mr-1">Team : </span>
                <AvatarGroup
                  max={4}
                  sx={{
                    "& .MuiAvatar-root": {
                      width: 24,
                      height: 24,
                      fontSize: 15,
                    },
                  }}
                >
                  {ideaTeams.map((a) => (
                    <Avatar
                      key={a.user_id}
                      alt={`${a.firstname} ${a.lastname}`}
                      src={a.user.avatar_url}
                      sx={{ width: 32, height: 32 }}
                    />
                  ))}
                </AvatarGroup>
              </Stack>
            </div>
          )}
        </div>
      </Link>
      {!isMini && !isDisabled && (
        <IdeaCardActions
          userId={user.id}
          user={userId}
          id={id}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
}

IdeaCard.propTypes = {
  ...IdeaPropTypes,
};
