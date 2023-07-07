import { Avatar, Button, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/fr";

function UserCommunityCard({ user }) {
  const {
    id,
    firstname,
    lastname,
    joined_at: joinedAt,
    position,
    agency,
    avatar_url: avatarUrl,
  } = user;

  const navigate = useNavigate();

  return (
    <div
      aria-label="card"
      className="flex flex-col shadow-lg border-[1px] border-solid border-[#f7f7f7] bg-white duration-100 rounded-xl group"
    >
      <div
        aria-label="header"
        className="flex h-full py-4 px-2 lg:py-6 lg:px-4"
      >
        <Avatar
          src={avatarUrl}
          onClick={() => navigate(`/users/${id}`)}
          className="mx-2 lg:mx-4 w-12 h-12 lg:w-16 lg:h-16 border-[1px] border-solid border-[#f7f7f7] shadow-sm hover:cursor-pointer"
        />
        <div aria-label="content" className="flex flex-col px-2">
          <div
            aria-label="name"
            className="my-1 font-bold text-lg sm:text-base lg:text-xl"
          >
            {firstname} {lastname}
          </div>
          <div
            aria-label="position"
            className="my-1 text-sm sm:text-xs lg:text-base font-semibold text-secondary-600"
          >
            {position.name}
          </div>
          <div
            aria-label="position"
            className="my-1 text-sm sm:text-xs lg:text-base font-semibold text-secondary-600"
          >
            {agency.name}
          </div>
          <div
            aria-label="biography"
            className="my-1 text-sm sm:text-xs lg:text-base italic text-ellipsis sm:line-clamp-1 lg:line-clamp-2 text-secondary-600"
          >
            Joined at : {dayjs(joinedAt).locale("fr").format("YYYY-MM-DD")}
          </div>
        </div>
      </div>
      <Divider className="mx-6" />
      <div aria-label="action" className="flex justify-center items-center">
        <Button
          variant="outlined"
          color="primary"
          className="flex rounded-full mx-2 min-w-[122px] my-4"
          onClick={() => navigate(`/users/${user.id}`)}
          sx={{
            boxShadow: 1,
            "&:hover": { boxShadow: 2 },
            "&:active, &.Mui-focusVisible": { boxShadow: 4 },
          }}
        >
          View profile
        </Button>
      </div>
    </div>
  );
}

UserCommunityCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar_url: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    joined_at: PropTypes.string.isRequired,
    agency: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    position: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserCommunityCard;
