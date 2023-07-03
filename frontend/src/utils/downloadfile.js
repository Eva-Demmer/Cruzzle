import { saveAs } from "file-saver";

function downloadFile(data, filename) {
  const blob = new Blob([data], { type: "text/plain" });
  saveAs(blob, filename);
}

export default downloadFile;
