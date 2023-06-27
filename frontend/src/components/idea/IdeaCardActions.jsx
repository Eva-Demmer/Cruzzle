import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  HandThumbUpIcon,
  PencilIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useMediaQuery } from "react-responsive";
import { sm } from "../../utils/mediaQueries";

export default function IdeaCardActions({ userId, user, id, isFavorite }) {
  const smallQuery = useMediaQuery(sm);

  return (
    <div className="hidden group-hover:flex duration-100">
      <div
        className={`${
          smallQuery
            ? "right-2 -top-5"
            : "left-1/2 transform -translate-x-1/2 -top-5"
        } flex justify-center items-center gap-3 h-10 absolute border-solid border border-gray-400 bg-slate-50 px-3 rounded-full lg:right-8`}
      >
        {isFavorite ? (
          <StarIconSolid className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        ) : (
          <StarIconOutline className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        )}
        <Link className="no-underline w-auto" to={`/ideas/${id}`}>
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        </Link>
        <HandThumbUpIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        <Link className="no-underline w-auto" to={`/ideas/${id}`}>
          {userId === user && (
            <PencilIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
          )}
        </Link>
      </div>
    </div>
  );
}

IdeaCardActions.defaultProps = {
  user: 0, // Temporaire, Evite l'erreur warning: Failed prop type: The prop `user` is marked as required in `IdeaCardActions`, but its value is `undefined`.
};

IdeaCardActions.propTypes = {
  user: PropTypes.number,
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
