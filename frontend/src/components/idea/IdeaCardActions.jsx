import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  HandThumbUpIcon,
  PencilIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useMediaQuery } from "react-responsive";
import { postFavorit, deleteFavorit } from "../../services/api.favorits";
import { sm } from "../../utils/mediaQueries";
import { apiIdeas } from "../../services/api.ideas";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import { FilterFavoritesContext } from "../../contexts/FilterFavoritesContext";

export default function IdeaCardActions({ userId, user, id, isFavorite }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { update, setUpdate } = useContext(FilterFavoritesContext);

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
    navigate(route);
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
            className="h-6 w-6 text-gray-900 hover:text-primary-900 cursor-pointer"
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
          to={`/ideas/${id}`}
          onClick={() => handleClick(id, `/ideas/${id}`)}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        </Link>
        <HandThumbUpIcon className="h-6 w-6 text-gray-900 hover:text-primary-900 cursor-pointer" />
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
  // eslint-disable-next-line react/require-default-props
  user: PropTypes.number,
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
