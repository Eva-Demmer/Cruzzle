/* eslint-disable no-underscore-dangle */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import CustomChip from "../../styledComponents/CustomChip";
import ActionIcons from "./ActionIcons";

export default function TableOfCategories({ categoriesList, setUpdateList }) {
  const rows = categoriesList;
  const columns = [
    { field: "label", headerName: "Label", minWidth: 200, flex: 1.75 },
    {
      field: "ideas",
      headerName: "Use",
      valueGetter: (params) => `${params.row._count.idea_category} ideas`,
      minWidth: 100,
      flex: 1,
    },
    { field: "color", headerName: "Color", minWidth: 250, flex: 1 },
    {
      field: "preview",
      headerName: "Preview",
      renderCell: (params) => {
        return (
          <CustomChip label={params.row.label} colorchoice={params.row.color} />
        );
      },
      minWidth: 250,
      flex: 1,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <ActionIcons category={params.row} setUpdateList={setUpdateList} />
        );
      },
      minWidth: 100,
      flex: 0.25,
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
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

TableOfCategories.propTypes = {
  categoriesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      _count: PropTypes.shape({
        idea_category: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
