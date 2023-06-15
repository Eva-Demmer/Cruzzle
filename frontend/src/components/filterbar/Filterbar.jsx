import { Container, Box } from "@mui/material";

import FilterBtnAdvanceSearch from "./FilterBtnAdvanceSearch";
import FilterbarDate from "./FilterbarDate";
import FilterbarAutor from "./FilterbarAutor";
import FilterbarCategory from "./FilterbarCategory";
import FilterbarTrending from "./FilterbarTrending";

function Filterbar() {
  return (
    <Container className="filterbar px-0">
      <Box className="px-0 pb-4 flex justify-end">
        <FilterbarDate className="" />
      </Box>
      <Box className="px-0 pb-4 flex justify-between">
        <FilterBtnAdvanceSearch />
        <FilterbarAutor />
        <FilterbarCategory />
        <FilterbarTrending />
      </Box>
    </Container>
  );
}

export default Filterbar;
