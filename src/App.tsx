import { useState } from "react";
import "./App.css";
import Files from "./files";
import Folder from "./Folder";
import useHandler from "./useHandler";

function App() {
  const [files, setFiles] = useState(Files);
  const { addNodeToFiles, deleteNodeToFiles, updateNodeToFiles } = useHandler();

  const handlerAddNode = (id: number, name: string, type: string) => {
    const allFiles = addNodeToFiles(files, id, name, type);
    return allFiles;
  };
  const handlerDeleteNode = (id: number) => {
    const allFile = deleteNodeToFiles(files, id);
    setFiles(allFile);
  };

  const handlerUpdateNode = (name: string, id: number) => {
    const allFile = updateNodeToFiles(files, name, id);
    setFiles(allFile);
  };
  return (
    <div className="App">
      <div className="containerBody">
        <div className="sideBar">
          <div className="file-explorer">
            <Folder
              files={files}
              handlerAddNode={handlerAddNode}
              handlerDeleteNode={handlerDeleteNode}
              handlerUpdateNode={handlerUpdateNode}
            />
          </div>
        </div>
        <div className="main" style={{ color: "#000" }}>
          your content
        </div>
      </div>
    </div>
  );
}

export default App;
