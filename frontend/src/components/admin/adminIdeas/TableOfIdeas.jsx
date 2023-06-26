import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import ActionIcons from "./ActionIcons";

const columns = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "user_id", headerName: "Autor", width: 130 },
  {
    field: "created_at",
    headerName: "Created at",
    valueGetter: (params) => dayjs(params.row.created_at).format("DD-MM-YYYY"),
    width: 130,
  },
  {
    field: "archived_at",
    headerName: "Archived at",
    valueGetter: (params) =>
      params.row.archived_at
        ? dayjs(params.row.archived_at).format("DD-MM-YYYY")
        : "-",
    width: 130,
  },
  {
    field: "deleted_at",
    headerName: "Deleted at",
    valueGetter: (params) =>
      params.row.deleted_at
        ? dayjs(params.row.deleted_at).format("DD-MM-YYYY")
        : "-",
    width: 130,
  },
  { field: "views", headerName: "Views", type: "number", width: 60 },
  {
    field: "id",
    headerName: "Actions",
    renderCell: (params) => {
      return <ActionIcons ideaId={params.row.id} />;
    },
    width: 150,
    sortable: false,
  },
];

export default function TableOfIdeas({ ideaList }) {
  const rows = ideaList;

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

TableOfIdeas.propTypes = {
  ideaList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      deleted_at: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
    })
  ).isRequired,
};
