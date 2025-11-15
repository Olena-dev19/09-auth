"use client";
import Modal from "@/components/Modal/Modal";
import css from "../../../../components/NotePreview/NotePreview.module.css";
import { useParams, useRouter } from "next/dist/client/components/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (error || !note) return <p>Something went wrong.</p>;
  const handleClosePreview = () => {
    router.back();
  };

  const { title, content, tag, createdAt, updatedAt } = note;
  const formattedDate = note.updatedAt
    ? `Updated at: ${updatedAt}`
    : `Created at: ${createdAt}`;

  return (
    <Modal onClose={handleClosePreview}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleClosePreview}>
          ← Back
        </button>
        {note && (
          <div className={css.item}>
            <div className={css.tag}>{tag}</div>
            <div className={css.header}>
              <h2>{title}</h2>
            </div>
            <p className={css.content}>{content}</p>
            <p className={css.date}>{formattedDate}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
