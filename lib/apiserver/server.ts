import axios from "axios";
import type { Note } from "@/types/note";

const API_KEY = process.env.NOTEHUB_TOKEN;

if (!API_KEY) {
  throw new Error("NOTEHUB_TOKEN is not defined");
}

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/json",
  },
});

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export async function fetchNotes({ search, page = 1 }: FetchNotesParams) {
  const params = { search, page, perPage: 12 };
  const response = await instance.get<FetchNotesHTTPResponse>("", { params });
  return response.data;
}
