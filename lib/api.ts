import { NewNote, Note, User } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
// https://notehub-api.goit.study
axios.defaults.headers.common = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
};
// Notes api functions
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
  const { data } = await axios.post<Note>("/notes", newNote);

  return data;
}
export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`);
  return data;
}
export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${noteId}`);
  return data;
}

// Authetification api functions

export interface UserData {
  email: string;
  password: string;
}
export async function loginUser(loginData: UserData): Promise<User> {
  const { data } = await axios.post<User>("/auth/login", loginData);
  return data;
}

export async function registerUser(userData: UserData): Promise<User> {
  const { data } = await axios.post<User>("/auth/register", userData);
  return data;
}
export async function logoutUser(): Promise<void> {
  await axios.post("/auth/logout");
}

export async function userSession(): Promise<User> {
  const { data } = await axios.get<User>("/auth/session");
  return data;
}

// POST /auth/login – аутентифікація користувача. В тілі запиту очікує обов’язкові поля: email, password. У разі успіху у відповіді – об’єкт користувач.
// POST /auth/register – реєстрація нового користувача. В тілі запиту обов’язково: email, password. У разі успіху у відповіді – створений об’єкт користувача.
// POST /auth/logout – вихід користувача з системи. Тіло порожнє. У разі успіху у відповіді – статус 200 без тіла.
// GET /auth/session – перевірка активної сесії. У разі успіху у відповіді – об’єкт користувача. Або статус 200 без тіла, якщо користувач неавторизований.

//Users api functions
export async function userProfile(): Promise<User> {
  const { data } = await axios.get<User>("/users/me");
  return data;
}
export async function updateUserProfile(
  userData: Partial<User>
): Promise<User> {
  const { data } = await axios.patch<User>("/users/me", userData);
  return data;
}
// GET /users/me – отримати свій профіль. У разі успіху у відповіді – об’єкт користувача
// PATCH /users/me – оновити дані користувача. В тілі: оновлений об’єкт користувача. У разі успіху у відповіді – оновлений об’єкт користувача
