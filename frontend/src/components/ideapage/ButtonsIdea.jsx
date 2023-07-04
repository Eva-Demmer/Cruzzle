import {
  ArchiveBoxArrowDownIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";

function ButtonsIdea() {
  const user = useContext(UserContext);
  const { id: userId } = user;
  const { idea } = useContext(IdeaPageContext);
  const { user: userIdea } = idea;

  const isUserLikeIdea = () => {
    const ideaUserLike = idea.idea_like.filter(
      (item) => item.user_id === userId
    );
    return ideaUserLike.length > 0;
  };

  return (
    <div className="flex justify-around mb-2 xl:flex-col xl:absolute xl:top-8 xl:right-8">
      {userId === userIdea.id && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PencilSquareIcon className="h-6 w-6" />}
          className="rounded-full mx-2 my-2 sm:w-[136px]"
          onClick={() => {
            console.info("coucou");
          }}
        >
          Modify
        </Button>
      )}
      {userId === userIdea.id && idea.archived_at === null && (
        <Button
          variant="outlined"
          color="warning"
          startIcon={<ArchiveBoxArrowDownIcon className="h-6 w-6" />}
          className="rounded-full mx-2 my-2 sm:w-[136px]"
          onClick={() => {
            console.info("coucou");
          }}
        >
          Archive
        </Button>
      )}
      <Button
        variant={isUserLikeIdea() ? "contained" : "outlined"}
        color="info"
        startIcon={<HandThumbUpIcon className="h-6 w-6" />}
        className="rounded-full mx-2 my-2 sm:w-[136px]"
        onClick={() => {
          console.info("coucou");
        }}
      >
        Like
      </Button>
    </div>
  );
}
export default ButtonsIdea;
