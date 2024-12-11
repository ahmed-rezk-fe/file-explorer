const useHandler = () => {
  function createUniqueId() {
    const timestamp = Date.now().toString(36); // Converts timestamp to base-36
    const randomPart = Math.random().toString(36).substring(2, 8); // Random string
    return `${timestamp}-${randomPart}`;
  }

  function addNodeToFiles(
    files: any,
    feildId: number,
    nameNode: string,
    type: string
  ) {
    if (files.id === feildId && files.type === "folder") {
      files.data.unshift({
        id: createUniqueId(),
        name: nameNode,
        type: type,
        data: [],
      });
      return files;
    }
    files?.data?.map((item: any) => {
      let feild = addNodeToFiles(item, feildId, nameNode, type);
      if (feild) {
        return feild;
      }
    });
  }
  function deleteNodeToFiles(files: any, id: number) {
    if (files.id === id) {
      return null;
    }

    if (files.data && files.data.length > 0) {
      files.data = files.data.map((item: any) => deleteNodeToFiles(item, id));
      files.data = files.data.filter(Boolean);
    }

    return { ...files };
  }
  function updateNodeToFiles(files: any, name: string, id: number) {
    if (files.id === id) {
      return {
        ...files,
        name: name,
      };
    }

    if (files.data && files.data.length > 0) {
      files.data = files?.data?.map((item: any) =>
        updateNodeToFiles(item, name, id)
      );
    }
    return { ...files };
  }
  return { addNodeToFiles, deleteNodeToFiles, updateNodeToFiles };
};

export default useHandler;
