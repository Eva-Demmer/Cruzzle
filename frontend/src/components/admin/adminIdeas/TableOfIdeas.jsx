/* eslint-disable no-underscore-dangle */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import ActionIcons from "./ActionIcons";

export default function TableOfIdeas({ ideaList, setUpdateList }) {
  const rows = ideaList;
  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "user",
      headerName: "Autor",
      valueGetter: (params) =>
        `${params.row.user.firstname} ${params.row.user.lastname}`,
      width: 160,
    },
    {
      field: "created_at",
      headerName: "Created at",
      valueGetter: (params) =>
        dayjs(params.row.created_at).format("DD-MM-YYYY"),
      align: "center",
      width: 130,
    },
    {
      field: "archived_at",
      headerName: "Archived at",
      valueGetter: (params) =>
        params.row.archived_at
          ? dayjs(params.row.archived_at).format("DD-MM-YYYY")
          : "-",
      align: "center",
      width: 130,
    },
    {
      field: "deleted_at",
      headerName: "Deleted at",
      valueGetter: (params) =>
        params.row.deleted_at
          ? dayjs(params.row.deleted_at).format("DD-MM-YYYY")
          : "-",
      align: "center",
      width: 130,
    },
    {
      field: "files",
      headerName: "Files",
      valueGetter: (params) => params.row._count.attachment,
      align: "center",
      width: 60,
    },
    { field: "views", headerName: "Views", width: 60 },
    {
      field: "likes",
      headerName: "Likes",
      valueGetter: (params) => params.row._count.idea_like,
      align: "center",
      width: 60,
    },
    {
      field: "favorite",
      headerName: "Favorite",
      valueGetter: (params) => params.row._count.favorit,
      align: "center",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return <ActionIcons idea={params.row} setUpdateList={setUpdateList} />;
      },
      width: 150,
      align: "center",
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

TableOfIdeas.propTypes = {
  ideaList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        agency: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          country: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      created_at: PropTypes.string.isRequired,
      archived_at: PropTypes.string,
      deleted_at: PropTypes.string,
      views: PropTypes.number.isRequired,
      _count: PropTypes.shape({
        idea_like: PropTypes.number.isRequired,
        comment: PropTypes.number.isRequired,
        attachment: PropTypes.number.isRequired,
        idea_teams: PropTypes.number.isRequired,
        favorit: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
