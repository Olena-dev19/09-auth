import { NewNote, Note } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}
export interface SessionResponse {
  success: boolean;
}
export interface UserUpdatedData {
  email?: string;
  username: string;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
}
export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", newNote);

  return data;
}
export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}
export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
}

// Authetification api functions

export interface UserData {
  email: string;
  password: string;
}
export async function loginUser(loginData: UserData): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/login", loginData);
  return data;
}

export async function registerUser(userData: UserData): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
}
export async function logoutUser(): Promise<SessionResponse> {
  const res = await nextServer.post("/auth/logout");
  return res.data;
}
export async function checkSession(): Promise<SessionResponse> {
  const res = await nextServer.get("/auth/session");
  console.log("checksesion response:", res.data);
  return res.data;
}

//Users api functions
export async function getUser(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}
export async function updateUser(userData: UserUpdatedData): Promise<User> {
  const { data } = await nextServer.patch("/users/me", userData);
  console.log("updateUser data:", data);
  return data;
}
