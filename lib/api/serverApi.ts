import { cookies } from "next/headers";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNoteById(noteId: string) {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
export async function getServerUser(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log("getServerUser data:", data);

  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}
