import { Avatar, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import {
  apiCreateComments,
  apiGetCommentsByIdeaId,
} from "../../services/api.comments";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";

function CreateComment() {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState();
  const { id: userId, avatar_url: avatar } = user;
  const { setIdea, idea } = useContext(IdeaPageContext);
  const params = useParams();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [alert]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleButtonClick = async () => {
    const data = {
      user_id: userId,
      idea_id: parseInt(params.id, 10),
      body: comment,
    };
    if (comment) {
      try {
        const req = await apiCreateComments(data);
        if (req) {
          setAlert({
            message: "Message created !",
            severity: "success",
          });
          const { comment: commendIdea, ...rest } = idea;
          const getComments = await apiGetCommentsByIdeaId(idea.id);
          if (getComments) {
            setIdea({
              ...rest,
              comment: getComments,
            });
          }
          setComment("");
        } else {
          setAlert({
            message: "Message can't be created",
            severity: "error",
          });
        }
      } catch (error) {
        console.error(error);
        setAlert({
          message: "Message can't be created",
          severity: "error",
        });
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <>
      <div className="flex w-full mt-4">
        <Avatar
          alt="Remy Sharp"
          className="mx-4"
          src={avatar}
          sx={{ width: 36, height: 36 }}
        />
        <div className="w-full relative p-0" aria-label="comment">
          <TextField
            id="commentUser"
            onChange={(e) => handleChange(e)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={comment}
            multiline
            minRows={1}
            maxRows={4}
            onKeyDown={handleKeyPress}
            placeholder="Leave a few words"
            className="w-full"
            sx={{
              borderRadius: "0.75rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.75rem",
                paddingBottom: "48px",
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
          <IconButton
            aria-label="see more"
            size="small"
            color={`${isFocused ? "primary" : ""}`}
            className="absolute right-2 bottom-1"
            onClick={() => handleButtonClick()}
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
      {alert && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default CreateComment;
