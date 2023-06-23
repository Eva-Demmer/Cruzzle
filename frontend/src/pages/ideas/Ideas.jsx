import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
import FilterProvider from "../../contexts/FilterContext";
import Filterbar from "../../components/filterbar/Filterbar";
import { Modal } from "../../components/modal/Modal";

function Ideas() {
  const [isModalTest1Open, setIsModalTest1Open] = useState(false);
  const [ideas, setIdeas] = useState();
  const toggleModal = () => {
    setIsModalTest1Open(!isModalTest1Open);
  };

  useEffect(() => {
    axios.get("http://localhost:6001/api/ideas").then((res) => {
      setIdeas(res.data);
      console.info(res.data);

      return res.data;
    });
  }, []);

  useEffect(() => {
    // console.info(ideas);
  }, [ideas]);

  return (
    <FilterProvider>
      <IdeasProvider>
        <button type="button" onClick={toggleModal}>
          open modal
        </button>
        <div className="ideas-page w-full flex flex-col h-screen">
          <header className="w-full px-6 min-[1439px]:w-8/12 bg-white">
            <h2>Ideas</h2>
            <Filterbar />
          </header>
          <div className="ideas-header flex flex-row">
            <main className="ideas-main w-full min-[1439px]:w-8/12">
              <IdeaDisplayer isMini={false} />
            </main>
            <aside className="ideas-aside-right w-4/12 hidden pl-4 pr-4 min-[1439px]:inline-block">
              <h3>Tendences</h3>
              <IdeaDisplayer isMini="true" />
            </aside>
          </div>
          <Modal
            isOpen={isModalTest1Open}
            onClose={toggleModal}
            onSave={() => console.info("bonjour")}
          >
            <TextField
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
            <TextField
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
            <TextField
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
            <TextField
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
            <TextField
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Modal>
        </div>
      </IdeasProvider>
    </FilterProvider>
  );
}
export default Ideas;
