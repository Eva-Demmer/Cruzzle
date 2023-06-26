import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useState } from "react";
import CheckboxUserIsActive from "./CheckboxUserIsActive";

const columns = [
  { field: "firstname", headerName: "First name", width: 90 },
  { field: "lastname", headerName: "Last name", width: 90 },
  { field: "mail", headerName: "Mail", width: 200 },
  {
    field: "created_at",
    headerName: "Created at",
    valueGetter: (params) => dayjs(params.row.created_at).format("DD-MM-YYYY"),
    width: 130,
  },
  {
    field: "joined_at",
    headerName: "Joined at",
    valueGetter: (params) => dayjs(params.row.joined_at).format("DD-MM-YYYY"),
    width: 130,
  },
  {
    field: "agency_id",
    headerName: "Agency",
    valueGetter: (params) => params.row.agency_id,
    width: 130,
  },
  {
    field: "position_id",
    headerName: "Position",
    valueGetter: (params) => params.row.position_id,
    width: 130,
  },
  {
    field: "role_id",
    headerName: "Role",
    valueGetter: (params) => {
      switch (params.row.role_id) {
        case 88:
          return "super admin";
        case 55:
          return "admin";
        default:
          return "user";
      }
    },
    width: 130,
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
          UserId={params.row.id}
        />
      );
    },
    width: 60,
  },
];

export default function TableOfUsers({ userList }) {
  console.info(userList);
  const rows = userList;

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

TableOfUsers.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      mail: PropTypes.string.isRequired,
      hashed_password: PropTypes.string.isRequired,
      role_id: PropTypes.number.isRequired,
      avatar_url: PropTypes.string.isRequired,
      banner_url: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired,
      share_birthdate: PropTypes.bool.isRequired,
      phone: PropTypes.string.isRequired,
      share_phone: PropTypes.bool.isRequired,
      biography: PropTypes.string.isRequired,
      agency_id: PropTypes.number.isRequired,
      joined_at: PropTypes.string.isRequired,
      position_id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
