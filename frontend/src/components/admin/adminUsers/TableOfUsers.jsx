import { useState, useContext } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { UserContext } from "../../../contexts/UserContext";
import CheckboxUserIsActive from "./CheckboxUserIsActive";
import TableSelectRole from "./TableSelectRole";
import ActionIcons from "./ActionIcons";

export default function TableOfUsers({ userList, setUpdateList }) {
  const user = useContext(UserContext);
  const { role_id: currentUserRole } = user;

  const rows = userList;
  const columns = [
    { field: "firstname", headerName: "First name", minWidth: 90, flex: 1 },
    { field: "lastname", headerName: "Last name", minWidth: 90, flex: 1 },
    { field: "mail", headerName: "Mail", minWidth: 200, flex: 1 },
    {
      field: "created_at",
      headerName: "Created at",
      valueGetter: (params) =>
        dayjs(params.row.created_at).format("DD-MM-YYYY"),
      minWidth: 110,
      flex: 1,
    },
    {
      field: "joined_at",
      headerName: "Joined at",
      valueGetter: (params) => dayjs(params.row.joined_at).format("DD-MM-YYYY"),
      minWidth: 110,
      flex: 1,
    },
    {
      field: "agency",
      headerName: "Agency",
      valueGetter: (params) =>
        `${params.row.agency.name}, ${params.row.agency.city}`,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "position",
      headerName: "Position",
      valueGetter: (params) => params.row.position.name,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      renderCell: (params) => {
        return currentUserRole === 88 ? (
          <TableSelectRole user={params.row} />
        ) : (
          params.row.role.name
        );
      },
      minWidth: 140,
      sortable: false,
      flex: 1,
    },
    {
      field: "is_active",
      headerName: "Active",
      renderCell: (params) => {
        const [isActiveUser, setIsActiveUser] = useState(params.row.is_active);
        return (
          <CheckboxUserIsActive
            isActiveUser={isActiveUser}
            setIsActiveUser={setIsActiveUser}
            userId={params.row.id}
          />
        );
      },
      align: "center",
      minWidth: 60,
      flex: 0.25,
      sortable: false,
    },
    {
      field: "id",
      headerName: "Actions",
      renderCell: (params) => {
        return <ActionIcons user={params.row} setUpdateList={setUpdateList} />;
      },
      align: "center",
      minWidth: 120,
      flex: 0.5,
      sortable: false,
    },
  ];

  return (
    <div className="w-full h-full">
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        slots={{
          toolbar: GridToolbar,
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}

TableOfUsers.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
