import {
  ArchiveBoxArrowDownIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  useMediaQuery,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { useContext, useState } from "react";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import {
  apiCreateIdeaLikes,
  apiDeleteIdeaLikesById,
  apiGetIdeaLikesByIdeaId,
} from "../../services/api.ideaLikes";
import { lg } from "../../utils/mediaQueries";
import { apiArchiveIdeas } from "../../services/api.ideas";
import DialogArchive from "./DialogArchive";
import DialogModify from "./DialogModify";

function ButtonsIdea() {
  const user = useContext(UserContext);
  const { id: userId } = user;
  const { idea, setIdea } = useContext(IdeaPageContext);
  const { user: userIdea } = idea;
  const smallQuery = useMediaQuery(lg.query);

  const [openDialogArchive, setOpenDialogArchive] = useState(false);
  const [openDialogModify, setOpenDialogModify] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isUserLikeIdea = () => {
    const ideaUserLike = idea.idea_like.filter(
      (item) => item.user_id === userId
    );
    return ideaUserLike.length > 0;
  };

  const handleClickArchive = async () => {
    try {
      const archiveIdea = await apiArchiveIdeas(idea.id);
      if (archiveIdea) {
        const { archived_at: archivedIdea, ...restOfIdea } = idea;
        setIdea({ ...restOfIdea, archived_at: archiveIdea.archived_at });
        setOpenDialogArchive(false);
        setOpenAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickModify = async () => {
    try {
      setOpenDialogModify(false);
      navigate(`${location.pathname}/edit`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLike = async () => {
    try {
      const getIdeaLikesByIdea = await apiGetIdeaLikesByIdeaId(idea.id);

      if (getIdeaLikesByIdea) {
        const searchLikeUser = getIdeaLikesByIdea.filter(
          (item) => item.user_id === userId
        );
        if (searchLikeUser.length > 0) {
          await apiDeleteIdeaLikesById(searchLikeUser[0].id);
        } else {
          await apiCreateIdeaLikes(userId, idea.id);
        }

        const { idea_like: ideaLike, ...restOfIdea } = idea;
        const getAllIdeaLikeByIdea = await apiGetIdeaLikesByIdeaId(idea.id);

        if (getAllIdeaLikeByIdea) {
          setIdea({ ...restOfIdea, idea_like: getAllIdeaLikeByIdea });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mb-2 xl:flex-col xl:absolute xl:top-20 xl:right-10">
      {!smallQuery && (
        <div className="flex justify-between items-center py-2">
          {userId === userIdea.id && (
            <>
              <IconButton
                variant="outlined"
                color="primary"
                className="mx-2 mt-1"
                onClick={() => setOpenDialogModify(true)}
              >
                <PencilSquareIcon className="h-6 w-6" />
              </IconButton>
              <Divider orientation="vertical" className="mt-1" />
            </>
          )}
          {userId === userIdea.id && idea.archived_at === null && (
            <>
              <IconButton
                color="warning"
                className="mx-2 mt-1"
                onClick={() => setOpenDialogArchive(true)}
              >
                <ArchiveBoxArrowDownIcon className="h-6 w-6" />
              </IconButton>
              <Divider orientation="vertical" className="mt-1" />
            </>
          )}
          <IconButton
            color="info"
            variant={isUserLikeIdea() ? "contained" : "outlined"}
            className="mx-2 mt-1"
            onClick={() => handleClickLike()}
          >
            {isUserLikeIdea() ? (
              <HandThumbUpIconSolid className="h-6 w-6" />
            ) : (
              <HandThumbUpIcon className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      )}
      {smallQuery && userId === userIdea.id && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PencilSquareIcon className="h-6 w-6" />}
          className="rounded-full mx-2 my-2 sm:w-[136px]"
          onClick={() => setOpenDialogModify(true)}
        >
          Modify
        </Button>
      )}
      {smallQuery && userId === userIdea.id && idea.archived_at === null && (
        <Button
          variant="outlined"
          color="warning"
          startIcon={<ArchiveBoxArrowDownIcon className="h-6 w-6" />}
          className="rounded-full mx-2 my-2 sm:w-[136px]"
          onClick={() => {
            setOpenDialogArchive(true);
          }}
        >
          Archive
        </Button>
      )}
      {smallQuery && (
        <Button
          variant={isUserLikeIdea() ? "contained" : "outlined"}
          color="info"
          startIcon={<HandThumbUpIcon className="h-6 w-6" />}
          className="rounded-full mx-2 my-2 sm:w-[136px]"
          onClick={() => handleClickLike()}
        >
          {isUserLikeIdea() ? "Unlike" : "Like"}
        </Button>
      )}
      <DialogArchive
        open={openDialogArchive}
        setOpen={setOpenDialogArchive}
        handleAgree={handleClickArchive}
      />

      <DialogModify
        open={openDialogModify}
        setOpen={setOpenDialogModify}
        handleAgree={handleClickModify}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Idea archived !
        </Alert>
      </Snackbar>
    </div>
  );
}
export default ButtonsIdea;
