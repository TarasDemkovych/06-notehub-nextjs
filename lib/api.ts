import axios from "axios";
import type { Note } from "@/types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
axios.defaults.headers.common["Accept"] = "application/json";

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes({ search, page = 1 }: FetchNotesParams) {
  const params: FetchNotesParams = {
    page: page,
    perPage: 12,
  };
  if (search) params.search = search;

  const response = await axios.get<FetchNotesHTTPResponse>("", { params });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const res = await axios.get<Note>(`${id}`);
  return res.data;
}

export async function createNote({
  title,
  content = "",
  tag,
}: CreateNoteParams) {
  const response = await axios.post<Note>("", {
    title,
    content,
    tag,
  });
  return response.data;
}

export async function deleteNote(noteId: number) {
  const response = await axios.delete<Note>(`/${noteId}`);
  return response.data;
}
