// types.ts

export interface FileNode {
  id: number;
  type: "folder" | "file";
  name: string;
  meta?: string;
  data?: FileNode[];
}

export type FileMeta = "js" | "ts" | "html" | "svg" | "img" | "webp";
