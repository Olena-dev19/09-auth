"use client";
import NoteForm from "../NoteForm/NoteForm";
import css from "./CreateNote.module.css";

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};
export default CreateNote;
