import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const initialUser = {
  id: 2,
  mail: "super.admin@example.com",
  role_id: 88,
  avatar_url: "https://picsum.photos/1000/300",
  banner_url: "https://picsum.photos/1000/300",
  firstname: "Sarah",
  lastname: "Conor",
  link: "sarahconor.com",
  birthdate: "1972-11-12T12:33:11.000Z",
  share_birthdate: false,
  phone: "+33655758466",
  share_phone: false,
  biography: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
  agency_id: 2,
  joined_at: "2017-06-13T12:33:11.000Z",
  position_id: 1,
  score_comment: 999,
  score_idea: 999,
  score_like: 999,
  created_at: "2023-06-23T16:19:22.000Z",
  is_active: true,
};

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(initialUser);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
