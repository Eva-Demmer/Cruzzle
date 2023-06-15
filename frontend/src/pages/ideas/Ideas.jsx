import { Container, Box, Typography } from "@mui/material";

import FilterProvider from "../../contexts/FilterContext";
import Filterbar from "../../components/filterbar/Filterbar";

function Ideas() {
  return (
    <FilterProvider>
      <Container className="ideas-page w-full px-0 flex justify-center">
        <Container className="ideas-main w-3/4 px-0 bg-sky-200">
          <Box className="ideas-header w-full px-0">
            <Typography variant="h3">Ideas</Typography>
            <Filterbar />
          </Box>
        </Container>
        <Container className="ideas-aside-right w-1/4 bg-sky-400">
          asside
        </Container>
      </Container>
    </FilterProvider>
  );
}
export default Ideas;
