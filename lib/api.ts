import { NewNote, Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.defaults.headers.common = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", newNote);

  return response.data;
}
export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  console.log(response.data);
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
}
