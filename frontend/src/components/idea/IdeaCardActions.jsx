/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  HandThumbUpIcon as HandThumbUpIconOutline,
  PencilIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid";
import { useMediaQuery } from "react-responsive";
import { IdeaPropTypes } from "../propTypes/ideaPropTypes";

import {
  apiCreateIdeaLikes,
  apiDeleteIdeaLikesById,
  apiGetIdeaLikesByIdeaId,
} from "../../services/api.ideaLikes";
import { postFavorit, deleteFavorit } from "../../services/api.favorits";
import { sm } from "../../utils/mediaQueries";
import { apiIdeas } from "../../services/api.ideas";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import { FilterFavoritesContext } from "../../contexts/FilterFavoritesContext";

export default function IdeaCardActions({
  userId,
  user,
  id,
  isFavorite,
  isLiked,
  idea,
}) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { update, setUpdate } = useContext(FilterFavoritesContext);
  const [liked, setLiked] = useState(isLiked);

  const smallQuery = useMediaQuery(sm);
  const { setIdea } = useContext(IdeaPageContext);
  const navigate = useNavigate();

  const fetchDataAsync = async (ideaId) => {
    const result = await apiIdeas(ideaId);
    if (result) {
      setIdea(result);
    }
  };

  const handleClick = async (ideaId, route) => {
    await fetchDataAsync(ideaId);

    navigate(route, {
      state: { tabStateValue: 2 },
    });
  };

  const handleFavoriteClick = () => {
    if (!favorite) {
      postFavorit(user, id, "favorits");
      setFavorite(true);
    } else {
      deleteFavorit(user, id, "favorits");
      setFavorite(false);
    }
    setUpdate(!update);
  };

  const handleClickLike = async () => {
    try {
      const getIdeaLikesByIdea = await apiGetIdeaLikesByIdeaId(id);

      if (getIdeaLikesByIdea) {
        const searchLikeUser = getIdeaLikesByIdea.filter(
          (item) => item.user_id === user
        );
        if (searchLikeUser.length > 0) {
          await apiDeleteIdeaLikesById(searchLikeUser[0].id);
          setLiked(false);
        } else {
          await apiCreateIdeaLikes(user, id);
          setLiked(true);
        }
        const { idea_like: ideaLike, ...restOfIdea } = idea;
        const getAllIdeaLikeByIdea = await apiGetIdeaLikesByIdeaId(id);

        if (getAllIdeaLikeByIdea) {
          setIdea({ ...restOfIdea, idea_like: getAllIdeaLikeByIdea });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hidden group-hover:flex duration-100">
      <div
        className={`${
          smallQuery
            ? "right-2 -top-5"
            : "left-1/2 transform -translate-x-1/2 -top-5"
        } flex justify-center items-center gap-3 h-10 absolute border-solid border border-gray-400 bg-slate-50 px-3 rounded-full lg:right-8`}
      >
        {favorite ? (
          <StarIconSolid
            className="h-6 w-6 text-primary-900 cursor-pointer"
            onClick={handleFavoriteClick}
          />
        ) : (
          <StarIconOutline
            className="h-6 w-6 text-gray-900 hover:text-primary-900 cursor-pointer"
            onClick={handleFavoriteClick}
          />
        )}
        <Link
          className="no-underline w-auto"
          onClick={() => handleClick(id, `/ideas/${id}`)}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        </Link>
        {liked ? (
          <HandThumbUpIconSolid
            className="h-6 w-6 text-primary-900 cursor-pointer"
            onClick={handleClickLike}
          />
        ) : (
          <HandThumbUpIconOutline
            className="h-6 w-6 text-gray-900 hover:text-primary-900 cursor-pointer"
            onClick={handleClickLike}
          />
        )}
        <Link
          className="no-underline w-auto"
          to={`/ideas/${id}`}
          onClick={() => handleClick(id, `/ideas/${id}`)}
        >
          {userId === user && (
            <PencilIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
          )}
        </Link>
      </div>
    </div>
  );
}

IdeaCardActions.propTypes = {
  user: PropTypes.number.isRequired,
  idea_like: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  ...IdeaPropTypes,
};
