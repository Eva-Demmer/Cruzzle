import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const initialUser = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  birthdate: "01/01/2000",
  imgUrl:
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  imgBanner: "https://i.postimg.cc/d1jbSzSd/animals-2222007-1280.jpg",
  phone: "+330000849",
  mail: "john.doe@gmail.com",
  city: "New York",
  country: "USA",
  biography:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis veritatis alias consequuntur nam consectetur unde iusto maxime eum, itaque facere sit sequi? Exercitationem, excepturi! Officiis reprehenderit asperiores ullam magnam perferendis nostrum atque exercitationem quia necessitatibus, iste quibusdam natus esse sunt voluptatum non animi dolorem. Veritatis, aliquam numquam! Eius, consequuntur fugit.",
  agency: "New agency",
  position: "New position",
  score: 750,
  level: 16,
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
