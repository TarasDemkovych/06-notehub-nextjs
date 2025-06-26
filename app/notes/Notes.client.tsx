'use client';

import { useEffect, useState } from "react";
import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, FetchNotesHTTPResponse } from "@/lib/api/client";
import NoteModal from "@/components/NoteModal/NoteModal";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination"; 

interface NotesClientProps {
  initialData?: FetchNotesHTTPResponse;
}

export default function Notes({ initialData }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleCreateNote = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    data,
    isError,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes({ page, search: debouncedQuery }),
    placeholderData: keepPreviousData,
    initialData,
    refetchOnMount: false,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={query} onChange={(val: string) => setQuery(val)} />

          {isSuccess && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}

          <button onClick={handleCreateNote} className={css.button}>
            Create note +
          </button>
        </header>

        {isModalOpen && <NoteModal onClose={closeModal} />}

        {(isLoading || isFetching) && <Loader />}

        {isError && <ErrorMessage />}
        {isSuccess && data.notes.length === 0 && (
          <p className={css.empty}>No notes found.</p>
        )}

        {data?.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
      </div>
    </>
  );
}