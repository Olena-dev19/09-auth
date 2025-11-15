"use client";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "../../../../../lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "@/components/NotesPage/NotesPage.module.css";
import Pagination from "@/components/Pagination/Pagination";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface NotesProps {
  tag: NoteTag | undefined;
}
export default function NotesPageDefault({ tag }: NotesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", { currentPage, search: searchQuery, tag }],
    queryFn: () =>
      fetchNotes({ page: currentPage, search: searchQuery, tag, perPage: 12 }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const totalPage = data?.totalPages ? data.totalPages : 0;
  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 500);
  return (
    <>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} searchQuery={searchQuery} />
        {isSuccess && totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            updateCurrentPage={updateCurrentPage}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </div>
      {isSuccess && data?.notes?.length > 0 && <NoteList notes={data.notes} />}
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
    </>
  );
}
