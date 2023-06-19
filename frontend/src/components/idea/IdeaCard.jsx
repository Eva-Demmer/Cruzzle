import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import IdeaCardActions from "./IdeaCardActions";
import { lg } from "../../utils/mediaQueries";
import { UserContext } from "../../contexts/UserContext";

export default function IdeaCard({ isMini, idea }) {
  const lgQuery = useMediaQuery(lg);
  const { id: userNum } = useContext(UserContext);
  const {
    id,
    title,
    context,
    userId,
    createdAt,
    isPrivate,
    isFavorite,
    status,
    tags,
    comments,
    team,
    imgUrl,
  } = idea;

  return (
    <div
      className={`${
        isMini
          ? "max-w-xl py-1 border-solid border-primary-50 border-4 border-t-0 border-b-0 border-r-0"
          : "max-w-4xl"
      } flex lg:flex-row relative shadow-lg bg-white hover:bg-slate-100 duration-100 rounded-xl group`}
    >
      <Link
        className="flex flex-col lg:flex-row no-underline w-full max-w-4xl"
        to={`/idea/${id}`}
      >
        <div
          className={`${
            isMini
              ? "hidden"
              : "w-full h-32 bg-cover bg-center rounded-t-xl sm:h-48 lg:w-1/4 lg:h-auto lg:rounded-l-xl lg:rounded-r-none opacity-100 group-hover:opacity-90 duration-100"
          }`}
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        />
        <div
          className={`${
            isMini ? "w-auto" : "max-w-4xl lg:w-3/4"
          } pl-6 p-4 relative`}
        >
          {!isMini && !lgQuery && (
            <IdeaCardActions
              userId={userId}
              isFavorite={isFavorite}
              user={userNum}
              id={id}
            />
          )}
          <div className="flex items-center gap-2 mb-3 justify-start">
            {isPrivate ? (
              <LockClosedIcon
                className={`${isMini ? "hidden" : "h-6 w-6 text-gray-500"}`}
              />
            ) : (
              <LockOpenIcon
                className={`${isMini ? "hidden" : "h-6 w-6 text-gray-500"}`}
              />
            )}
            {tags.map((tag) => (
              <Chip
                sx={{
                  borderColor: tag.color,
                }}
                key={tag.name}
                label={tag.name}
                variant="outlined"
                size="small"
              />
            ))}
          </div>
          <h2 className="mr-8 text-lg text-black font-medium no-underline">
            {title}
          </h2>

          <p className="mr-8 mt-2 text-gray-600 dark:text-gray-300">
            {context}
          </p>
          {!isMini && (
            <div className="flex items-center justify-between mt-6 text-gray-400">
              <div className="hidden text-sm sm:flex">
                <span className="mr-1">Date : </span>
                <span className="font-bold">{createdAt}</span>
              </div>
              <Stack direction="row" className="items-center">
                <span className="text-sm mr-1">Status : </span>
                <Chip
                  label={status}
                  size="small"
                  variant="filled"
                  className={
                    status === "Archived" ? "bg-blue-300" : "bg-statusGreen"
                  }
                />
              </Stack>
              <div className="text-sm">
                <span className="font-bold mr-1">{comments.length}</span>
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
                  {team.map((u) => (
                    <Avatar
                      key={u.id}
                      alt={`${u.firstname} ${u.lastname}`}
                      src={u.imgUrl}
                      sx={{ width: 32, height: 32 }}
                    />
                  ))}
                </AvatarGroup>
              </Stack>
            </div>
          )}
        </div>
      </Link>
      {!isMini && lgQuery && (
        <IdeaCardActions
          userId={userId}
          isFavorite={isFavorite}
          user={userNum}
          id={id}
        />
      )}
    </div>
  );
}

IdeaCard.propTypes = {
  isMini: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  idea: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        likes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
    team: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    imgUrl: PropTypes.string.isRequired,
  }).isRequired,
};
