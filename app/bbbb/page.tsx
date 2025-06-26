import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export const revalidate = 5;

const Notes = async () => {
  const res = await fetchNotes({});
  return <NotesClient initialData={res} />;
};

export default Notes;