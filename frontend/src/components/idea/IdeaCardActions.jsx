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

export default function IdeaCardActions({ userId, user, id, isFavorite }) {
  return (
    <div>
      <div className="flex justify-center items-center gap-3 h-10 absolute right-2 -top-5 border-solid border border-gray-400 bg-slate-50 px-3 rounded-full lg:right-8 hidden group-hover:flex duration-100">
        {isFavorite ? (
          <StarIconSolid className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        ) : (
          <StarIconOutline className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        )}
        <Link
          className="no-underline w-auto max-w-4xl group"
          to={`/idea/${id}`}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        </Link>
        <HandThumbUpIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        <Link
          className="no-underline w-auto max-w-4xl group"
          to={`/idea/${id}`}
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
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
