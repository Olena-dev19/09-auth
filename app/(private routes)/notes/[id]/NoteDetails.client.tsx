"use client";

import { fetchNoteById } from "../../../../lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "../../../components/NoteDetails/NoteDetails.module.css";

const NoteDetailsClient = () => {
  const { id } = useParams<{
    id: string;
  }>();
  console.log("noteId:", id);
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading note details...</p>}
      {error && !note && <p>Something went wrong.</p>}
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
        </div>
      </div>
    </>
  );
};
export default NoteDetailsClient;
