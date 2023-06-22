import formatBytes from "./formatBytes";

function handleFileProcessing(
  fileList,
  maxSizeInKB,
  maxFiles,
  filesAttachment,
  setErrorFiles,
  setOpen,
  setFilesAttachment
) {
  const addingFiles = [];
  const newErrorFiles = [];

  const maxId = filesAttachment.reduce((max, file) => {
    return file.id > max ? file.id : max;
  }, 0);

  for (let i = 0; i < fileList.length; i += 1) {
    const file = fileList[i];
    const fileId = maxId + i + 1;
    const fileSizeInKB = file.size / 1024;

    const fileData = {
      id: fileId,
      file,
    };

    // Check if file size exceeds the maximum allowed size
    if (fileSizeInKB > maxSizeInKB) {
      newErrorFiles.push({
        id: i,
        message: (
          <>
            The file <strong>{file.name}</strong> exceeds the maximum allowed
            size of {formatBytes(maxSizeInKB * 1024)}!
          </>
        ),
      });
    } else {
      // Check if the file already exists in the attachment list
      const fileExists = filesAttachment.some(
        (attachedFile) => attachedFile.file.name === file.name
      );
      if (fileExists) {
        newErrorFiles.push({
          id: i,
          message: (
            <>
              The file <strong>{file.name}</strong> already exists!
            </>
          ),
        });
      } else {
        // Add the file to the attachment list if it meets all conditions
        addingFiles.push(fileData);
      }
    }
  }

  // Check if the maximum number of files is exceeded
  if (filesAttachment.length + addingFiles.length > maxFiles) {
    newErrorFiles.push({
      id: 9999,
      message: (
        <>
          The following file(s) exceed(s) the maximum allowed count of{" "}
          <strong>{maxFiles}</strong>!
        </>
      ),
    });
  }

  if (newErrorFiles.length > 0) {
    setErrorFiles(newErrorFiles);
    setOpen(true);
  } else {
    setErrorFiles([]);
    setOpen(false);
    setFilesAttachment((prevFiles) => [...prevFiles, ...addingFiles]);
  }
}

export default handleFileProcessing;
