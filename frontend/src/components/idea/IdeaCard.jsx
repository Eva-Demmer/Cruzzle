/* eslint-disable camelcase */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IdeaCardActions from "./IdeaCardActions";
import { UserContext } from "../../contexts/UserContext";

export default function IdeaCard({ isMini, idea }) {
  const { id: userNum } = useContext(UserContext);
  const {
    id,
    title,
    context,
    user,
    created_at,
    archived_at,
    deleted_at,
    idea_category,
    _count,
    idea_teams,
    primary_img,
  } = idea;

  return (
    <div
      className={`${
        isMini
          ? "max-w-xl py-1 border-solid border-primary-50 border-4 border-t-0 border-b-0 border-r-0"
          : "max-w-6xl min-w-[250px]"
      } flex shadow-lg bg-white hover:bg-slate-100 duration-100 rounded-xl group sm:flex-row relative`}
    >
      <Link
        className="flex flex-col no-underline w-full sm:flex-row "
        to={`/idea/${id}`}
      >
        <div
          className={`${
            isMini
              ? "hidden"
              : "w-full h-32 bg-cover bg-center opacity-100 group-hover:opacity-90 duration-100 rounded-t-xl sm:h-auto sm:w-1/4 sm:rounded-l-xl sm:rounded-r-none"
          }`}
          style={{
            backgroundImage: `url(${primary_img})`,
          }}
        />
        <div className={`${isMini ? "w-auto" : "max-w-4xl sm:w-3/4"} pl-6 p-4`}>
          <div className="flex items-center gap-2 mb-3 justify-start">
            {idea_category.map((tag) => (
              <Chip
                sx={{
                  borderColor: tag.color,
                }}
                key={tag.label}
                label={tag.label}
                variant="outlined"
                size="small"
              />
            ))}
          </div>
          <h2
            className={`${
              isMini ? "font-normal text-base text-gray-700" : "text-black"
            } mr-8 text-lg font-medium no-underline max-w-xl`}
          >
            {title}
          </h2>

          <p
            className={`${
              isMini ? "text-gray-400" : "text-gray-600"
            } mr-8 mt-2 `}
          >
            {context}
          </p>
          {!isMini && (
            <div className="flex items-center justify-between mt-6 text-gray-400">
              <div className="hidden text-sm sm:flex">
                <span className="mr-1">Date : </span>
                <span className="font-bold">{created_at.slice(0, 10)}</span>
              </div>
              <Stack direction="row" className="items-center">
                <span className="text-sm mr-1">Status : </span>
                <Chip
                  label={archived_at || deleted_at ? "Closed" : "Ongoing"}
                  size="small"
                  variant="filled"
                  className={
                    archived_at || deleted_at ? "bg-slate-200" : "bg-green-300"
                  }
                />
              </Stack>
              <div className="text-sm">
                <span className="font-bold mr-1">{_count.comment}</span>
                <span>replies</span>
              </div>
              <Stack direction="row" className="hidden items-center lg:flex">
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
                  {idea_teams.map((u) => (
                    <Avatar
                      key={u.id}
                      alt={`${u.firstname} ${u.lastname}`}
                      src={u.avatar_url}
                      sx={{ width: 32, height: 32 }}
                    />
                  ))}
                </AvatarGroup>
              </Stack>
            </div>
          )}
        </div>
      </Link>
      {!isMini && <IdeaCardActions userId={user.id} user={userNum} id={id} />}
    </div>
  );
}

// Changera avec les données réelles
IdeaCard.propTypes = {
  isMini: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  idea: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    created_at: PropTypes.string.isRequired,
    archived_at: PropTypes.string,
    deleted_at: PropTypes.string,
    idea_category: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
    _count: PropTypes.shape({
      idea_like: PropTypes.number.isRequired,
      comment: PropTypes.number.isRequired,
      attachment: PropTypes.number.isRequired,
    }).isRequired,
    idea_teams: PropTypes.arrayOf(
      PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
      })
    ).isRequired,
    primary_img: PropTypes.string.isRequired,
  }).isRequired,
};
