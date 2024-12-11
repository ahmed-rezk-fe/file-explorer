import { FileNode } from "./types";

const Files: FileNode = {
  id: 1,
  type: "folder",
  name: "parent",
  data: [
    {
      id: 2,
      type: "folder",
      name: "root",
      data: [
        {
          id: 3,
          type: "folder",
          name: "src",
          data: [
            {
              id: 4,
              type: "file",
              name: "index.js",
            },
          ],
        },
        {
          id: 5,
          type: "folder",
          name: "public",
          data: [
            {
              id: 6,
              type: "file",
              name: "index.ts",
            },
          ],
        },
        {
          id: 7,
          type: "file",
          name: "index.html",
        },
        {
          id: 8,
          type: "folder",
          name: "data",
          data: [
            {
              id: 9,
              type: "folder",
              name: "images",
              data: [
                {
                  id: 10,
                  type: "file",
                  name: "image.png",
                },
                {
                  id: 11,
                  type: "file",
                  name: "image2.webp",
                },
              ],
            },
            {
              id: 12,
              type: "file",
              name: "logo.svg",
            },
          ],
        },
      ],
    },
  ],
};

export default Files;
