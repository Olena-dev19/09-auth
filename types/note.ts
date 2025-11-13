export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface User {
  email: string;
  password: string;
  avatar?: string;
}
