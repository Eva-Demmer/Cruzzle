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
    banner_url: bannerUrl,
  } = user;

  const navigate = useNavigate();

  return (
    <div
      aria-label="card"
      className="flex flex-col shadow-lg border-[1px] border-solid border-[#f7f7f7] bg-white duration-100 rounded-xl group"
    >
      <div className="w-full relative ">
        <img
          src={bannerUrl}
          alt="banner profile"
          className="w-full h-20 rounded-t-xl object-cover"
        />
        <Avatar
          src={avatarUrl}
          onClick={() => navigate(`/users/${id}`)}
          alt="pic profile"
          className="mx-4 w-14 h-14 lg:w-16 lg:h-16 border-[1px] border-solid border-[#f7f7f7] shadow-sm hover:cursor-pointer absolute bottom-2"
        />
        <div
          aria-label="name"
          className="my-1 font-bold text-lg sm:text-base lg:text-xl pl-20 lg:pl-24"
        >
          {firstname} {lastname}
        </div>
      </div>
      <div
        aria-label="header"
        className="flex h-full w-full py-4 px-2 lg:py-2 lg:px-4"
      >
        <div aria-label="content" className="flex flex-col px-2">
          <div
            aria-label="position"
            className="my-1 text-sm sm:text-xs lg:text-base font-semibold text-secondary-600"
          >
            {position.name} - {agency.name}
          </div>
          <div
            aria-label="biography"
            className="my-1 text-sm sm:text-xs lg:text-base italic text-ellipsis text-secondary-600"
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
    banner_url: PropTypes.string.isRequired,
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
