/* eslint-disable no-underscore-dangle */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import CustomChip from "../../styledComponents/CustomChip";
import ActionIcons from "./ActionIcons";

export default function TableOfCategories({ categoriesList }) {
  const rows = categoriesList;
  const columns = [
    { field: "label", headerName: "Label", width: 200 },
    {
      field: "ideas",
      headerName: "Use",
      valueGetter: (params) => `${params.row._count.idea_category} ideas`,
      width: 100,
    },
    { field: "color", headerName: "Color", width: 250 },
    {
      field: "preview",
      headerName: "Preview",
      renderCell: (params) => {
        return (
          <CustomChip label={params.row.label} colorchoice={params.row.color} />
        );
      },
      width: 250,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return <ActionIcons ideaId={params.row.id} />;
      },
      width: 100,
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
};
