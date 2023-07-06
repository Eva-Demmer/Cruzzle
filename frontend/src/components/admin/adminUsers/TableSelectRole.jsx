import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import apiAdminRoles from "../../../services/api.admin.roles";
import { apiAdminUpdateUserById } from "../../../services/api.admin.users";

export default function TableSelectRole({ user }) {
  const [roleList, setRoleList] = useState([{ id: 0, name: "loading" }]);
  const [selectedUserRole, setSelectedUserRole] = useState(0);

  const handleChange = (event) => {
    const roleId = event.target.value;
    apiAdminUpdateUserById(user.id, { role_id: roleId })
      .then((res) => {
        if (res.status === 200) {
          setSelectedUserRole(event.target.value);
        } else {
          console.error("Cannot update user role");
        }
      })
      .catch((error) => console.error("Error updating user role", error));

    setSelectedUserRole(event.target.value);
  };

  useEffect(() => {
    apiAdminRoles()
      .then((res) => {
        if (res.status === 200) {
          setRoleList(res.data);
          setSelectedUserRole(user.role.id);
        } else {
          console.error("Cannot get roles");
        }
      })
      .catch((error) => console.error("Error getting roles", error));
  }, []);

  return (
    <FormControl variant="standard" size="small" className="w-28">
      <Select
        id="select-small"
        value={selectedUserRole}
        onChange={handleChange}
      >
        {roleList.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

TableSelectRole.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mail: PropTypes.string.isRequired,
    role: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    agency: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    joined_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    position: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
