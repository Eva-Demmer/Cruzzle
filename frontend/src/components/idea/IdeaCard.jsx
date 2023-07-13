/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Chip,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import dayjs from "dayjs";
import { sm, md, lg } from "../../utils/mediaQueries";
import { UserContext } from "../../contexts/UserContext";

import IdeaCardActions from "./IdeaCardActions";
import { IdeaPropTypes } from "../propTypes/ideaPropTypes";
import { apiUpdateIdeaView } from "../../services/api.ideas";

export default function IdeaCard({ isMini, idea }) {
  const [avatarGroupWidth, setAvatarGroupWidth] = useState();
  const [containerWidth, setContainerWidth] = useState();

  const smallQuery = useMediaQuery(sm.query);
  const mediumQuery = useMediaQuery(md.query);
  const largeQuery = useMediaQuery(lg.query);

  const avatarGroupRef = useRef(null);
  const containerRef = useRef(null);

  const isOverLoad =
    parseInt(avatarGroupWidth, 10) >= parseInt(containerWidth, 10);

  const navigate = useNavigate();

  const { user: currentUser } = useContext(UserContext);
  const { id: userId } = currentUser;
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

  const date = dayjs(createdAt).format("DD/MM/YYYY");

  useEffect(() => {
    if (avatarGroupRef.current && containerRef.current) {
      setAvatarGroupWidth(avatarGroupRef.current.clientWidth);
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [smallQuery, mediumQuery, largeQuery]);

  const isFavorite = favorit.some((item) => item.user_id === userId);
  const isDisabled = archivedAt !== null || deletedAt !== null;
  const incViews = views + 1;

  const handleNavigate = () => {
    apiUpdateIdeaView(id, incViews);
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
        className="flex flex-col no-underline w-full lg:flex-row"
        onClick={handleNavigate}
      >
        <div
          className={`${
            isMini
              ? "hidden"
              : "w-full h-32 bg-cover bg-center opacity-100  duration-100 rounded-t-xl lg:h-auto lg:w-1/4 lg:rounded-l-xl lg:rounded-r-none"
          }
          ${isDisabled ? "" : "group-hover:opacity-90"}
          `}
          style={{
            backgroundImage: `url(${primaryImg})`,
          }}
        />
        <div
          className={`${
            isMini ? "w-auto" : "max-w-4xl lg:w-3/4"
          } overflow-x-hidden pl-6 p-4`}
        >
          <div
            ref={containerRef}
            className="flex wrap items-center gap-2 mb-3 justify-star"
          >
            <AvatarGroup
              ref={avatarGroupRef}
              spacing={8}
              className="flex wrap gap-4 nowrap mr-2"
            >
              {ideaCategory.slice(0, isOverLoad ? 2 : 3).map((tag, index) => {
                if (index === 0) {
                  return (
                    <Chip
                      key={`${tag.category.id}-${tag.category.label}`}
                      label={tag.category.label}
                      sx={{
                        borderColor: tag.category.color,
                        color: tag.category.color,
                      }}
                      variant="outlined"
                    />
                  );
                }
                if (index >= 1) {
                  return isOverLoad ? (
                    <Tooltip
                      key={`${tag.category.id}`}
                      title={
                        <ul>
                          {ideaCategory.slice(1, 3).map((tag) => (
                            <li
                              key={`${tag.category.id}-${tag.category.label}`}
                            >
                              {tag.category.label}
                            </li>
                          ))}
                        </ul>
                      }
                      arrow
                    >
                      <div>
                        <Avatar
                          sx={{ width: 30, height: 30 }}
                          className="cursor-pointer"
                          key={`${tag.category.id}-${tag.category.label}`}
                        >
                          +{ideaCategory.length - 1}
                        </Avatar>
                      </div>
                    </Tooltip>
                  ) : (
                    <Chip
                      key={`${tag.category.id}-${tag.category.label}`}
                      label={tag.category.label}
                      sx={{
                        borderColor: tag.category.color,
                        color: tag.category.color,
                      }}
                      variant="outlined"
                    />
                  );
                }
                return null;
              })}
            </AvatarGroup>
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
                <span className="mr-1">Date: </span>
                <span className="font-bold">{date}</span>
              </div>
              <Stack direction="row" className="items-center flex-1">
                <span className="text-sm mr-1">Status: </span>
                <Chip
                  label={archivedAt || deletedAt ? "Closed" : "In progress"}
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
                <span className="text-sm mr-1">
                  {ideaTeams.length ? "Team: " : "Author: "}
                </span>
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
                  <Avatar
                    key={id}
                    alt={`${user.firstname} ${user.lastname}`}
                    src={user.avatar_url}
                    sx={{ width: 32, height: 32 }}
                  />
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
