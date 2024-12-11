import React, { useState, useEffect, useRef } from "react";
import { FaFolder, FaFileCirclePlus } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { MdEdit, MdDelete, MdCreateNewFolder } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileNode } from "./types";

interface FolderProps {
  files: any;
  handlerAddNode: (id: number, name: string, type: string) => FileNode[];
  handlerDeleteNode: (id: number) => void;
  handlerUpdateNode: (name: string, id: number) => void;
}

const Folder: React.FC<FolderProps> = ({
  files,
  handlerAddNode,
  handlerDeleteNode,
  handlerUpdateNode,
}) => {
  const [nameField, setNameField] = useState<string>(files.name);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<{ show: boolean; type: string }>({
    show: false,
    type: "folder",
  });
  const [showUpdateInput, setShowUpdateInput] = useState<{
    show: boolean;
    type: string;
  }>({
    show: false,
    type: "folder",
  });
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  } | null>(null);

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const deleteNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlerDeleteNode(files.id);
  };

  const handelAddNode = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    setIsOpen(true);
    setShowInput({ show: true, type });
  };

  const enterAdd = (e: React.KeyboardEvent<HTMLInputElement>, type: string) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handlerAddNode(files.id, e.currentTarget.value, showInput.type);
      setShowInput({ ...showInput, show: false });
    }
  };

  const updateNode = (e: React.MouseEvent, type: string, name: string) => {
    setNameField(name);
    e.stopPropagation();
    setShowUpdateInput({ show: true, type });
  };

  const enterUpdate = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handlerUpdateNode(e.currentTarget.value, files.id);
      setShowUpdateInput({ ...showUpdateInput, show: false });
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleCopy = () => {
    console.log("Copied: ", files.name);
  };

  const handlePaste = () => {
    alert(`Pasted: ${files.name}`);
    handleCloseContextMenu();
  };

  // Close context menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target as Node)
      ) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return files.type === "folder" ? (
    <div className="folder" style={{ cursor: "pointer", margin: "12px 0px" }}>
      <div onClick={handleClick} onContextMenu={handleContextMenu}>
        <div className="header_feild">
          <span style={{ display: "flex" }}>
            {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
            <FaFolder />
            {showUpdateInput.show ? (
              <div className="addNode" style={{ marginInlineStart: "20px" }}>
                <input
                  type="text"
                  autoFocus
                  onBlur={() =>
                    setShowUpdateInput({ ...showUpdateInput, show: false })
                  }
                  onKeyDown={(e) => enterUpdate(e, "folder")}
                />
              </div>
            ) : (
              <label>{files.name}</label>
            )}
          </span>
          <div className="optionFeild">
            <button onClick={deleteNode}>
              <MdDelete />
            </button>
            <button onClick={(e) => updateNode(e, "folder", files.name)}>
              <MdEdit />
            </button>
            <button onClick={(e) => handelAddNode(e, "folder")}>
              <MdCreateNewFolder />
            </button>
            <button onClick={(e) => handelAddNode(e, "file")}>
              <FaFileCirclePlus />
            </button>
          </div>
        </div>
      </div>
      {showInput.show && (
        <div className="addNode" style={{ marginInlineStart: "20px" }}>
          <span style={{ marginInlineEnd: "10px" }}>
            {showInput.type === "folder" ? <FaFolder /> : <FaFile />}
          </span>
          <input
            type="text"
            autoFocus
            onBlur={() => setShowInput({ ...showInput, show: false })}
            onKeyDown={(e) => enterAdd(e, showInput.type)}
          />
        </div>
      )}
      {isOpen && (
        <div style={{ marginLeft: 20, marginBlock: "8px" }}>
          {files.data?.map((item: FileNode) => (
            <Folder
              key={item.id}
              files={item}
              handlerAddNode={handlerAddNode}
              handlerDeleteNode={handlerDeleteNode}
              handlerUpdateNode={handlerUpdateNode}
            />
          ))}
        </div>
      )}
      {contextMenu && contextMenu.visible && (
        <div
          ref={contextMenuRef}
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            padding: "10px",
          }}
          onClick={handleCloseContextMenu}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, color: "#000" }}
          >
            <li
              onClick={handleCopy}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              Copy
            </li>
            <li
              onClick={handlePaste}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              Paste
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    <div className="header_feild" onContextMenu={handleContextMenu}>
      <div className="file" style={{ display: "flex" }}>
        <FaFile />
        {showUpdateInput.show ? (
          <div className="addNode" style={{ marginInlineStart: "20px" }}>
            <input
              type="text"
              autoFocus
              onBlur={() =>
                setShowUpdateInput({ ...showUpdateInput, show: false })
              }
              onKeyDown={(e) => enterUpdate(e, "folder")}
            />
          </div>
        ) : (
          <span>{files.name}</span>
        )}
      </div>
      <div className="optionFeild">
        <button onClick={deleteNode}>
          <MdDelete />
        </button>
        <button onClick={(e) => updateNode(e, "folder", files.name)}>
          <MdEdit />
        </button>
      </div>
      {contextMenu && contextMenu.visible && (
        <div
          ref={contextMenuRef}
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            padding: "10px",
          }}
          onClick={handleCloseContextMenu}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, color: "#000" }}
          >
            <li
              onClick={handleCopy}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              Copy
            </li>
            <li
              onClick={handlePaste}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              Paste
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Folder;
