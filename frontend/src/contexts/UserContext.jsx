import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const initialUser = {
  id: 1,
  mail: "super.admin@example.com",
  role: {
    id: 88,
    name: "superAdmin",
  },
  avatar_url: "https://picsum.photos/200",
  banner_url: "https://picsum.photos/1000/300",
  firstname: "Sarah",
  lastname: "Conor",
  link: null,
  birthdate: "1972-11-12T12:33:11.000Z",
  share_birthdate: false,
  phone: "+33655758466",
  share_phone: false,
  biography: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
  agency: {
    id: 1,
    name: "Wildforge",
    city: "Bordeaux",
    country: "France",
  },
  joined_at: "2017-06-13T12:33:11.000Z",
  created_at: "2023-07-06T10:31:27.000Z",
  position: {
    id: 1,
    name: "Director",
  },
  _count: {
    idea_like: 3,
    comment: 0,
    idea: 1,
    comment_like: 1,
    favorit: 2,
    idea_teams: 2,
  },
};

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
