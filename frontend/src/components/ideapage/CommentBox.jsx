import { Paper, Avatar, Button, ButtonGroup, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import dayjs from "dayjs";
import { HandThumbUpIcon as SolidHandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as OutlineHandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../../contexts/UserContext";

function CommentBox({ comment, divider = false }) {
  const user = useContext(UserContext);
  const { id: userId } = user;
  // const [likes, setLikes] = useState(comment.comment_like.length);

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div className="flex">
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 30, height: 30 }}
            src={comment.user.avatar_url}
          />
          <div className="flex items-center">
            <h4 className="mx-2 text-base">
              {comment.user.firstname} {comment.user.lastname}
            </h4>
            <div className="flex items-center font-semibold">
              <p className="bloc text-secondary-600 text-sm">
                - {dayjs(comment.created_at).format("DD MMM, YYYY HH:mm a")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div
            className="h-full w-11 flex justify-center"
            aria-label="left side"
          >
            {divider && <Divider orientation="vertical" className="mr-2" />}
          </div>
          <div className="w-full" aria-label="comment">
            <Paper
              elevation={0}
              className="relative p-6 w-full rounded-xl border border-[#dadada] border-solid"
            >
              <div className="flex flex-col">
                <div>
                  <p style={{ textAlign: "left" }}>{comment.body}</p>
                </div>
                <Paper
                  elevation={0}
                  size="small"
                  className="absolute flex items-center px-4 bottom-[-20px] right-6 w-24 h-8 border border-[#dadada] border-solid rounded-full"
                >
                  <div
                    className="flex items-center justify-center w-full text-secondary-600"
                    aria-label="like"
                  >
                    <SolidHandThumbUpIcon className="min-h-5 min-w-5 max-h-5 max-w-5 h-5 w-5 mx-1" />
                    <div className="mx-1 font-semibold">
                      {comment.comment_like.length}
                    </div>
                  </div>
                </Paper>
              </div>
            </Paper>
            <div className="flex pl-2">
              <ButtonGroup
                size="small"
                aria-label="small button group"
                disableRipple
                disableFocusRipple
              >
                <Button
                  variant="text"
                  startIcon={<OutlineHandThumbUpIcon className="h-5 w-5" />}
                  className="flex  text-secondary-600"
                  onClick={() => console.info("add like")}
                  sx={{ margin: 1 }}
                >
                  Like
                </Button>
                {comment.user_id === userId && (
                  <Button
                    variant="text"
                    startIcon={<PencilSquareIcon className="h-5 w-5" />}
                    className="flex  text-secondary-600"
                    onClick={() => console.info("modify")}
                    sx={{ margin: 1 }}
                  >
                    Modify
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const commentShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  comment_like: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      comment_id: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
    })
  ),
  created_at: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }),
  user_id: PropTypes.number.isRequired,
});

CommentBox.propTypes = {
  comment: commentShape.isRequired,
  divider: PropTypes.bool,
};

CommentBox.defaultProps = {
  divider: false,
};

export default CommentBox;
