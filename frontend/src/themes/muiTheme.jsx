import { createTheme } from "@mui/material";

const rootElement = document.getElementById("root");
const themeMui = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  palette: {
    primary: {
      main: "#9C27B0",
    },
  },
});

export default themeMui;
