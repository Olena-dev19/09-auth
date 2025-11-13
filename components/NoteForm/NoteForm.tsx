import css from "./NoteForm.module.css";

import type { NewNote } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import * as Yup from "yup";
import { ChangeEvent, useId } from "react";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraft } from "@/lib/store/noteStore";
// import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

// interface NoteFormProps {
//   onClose: () => void;
// }
// const formValues: NewNote = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// const NotesSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Too short!")
//     .max(50, "Too long!")
//     .required("Required field"),
//   content: Yup.string().max(500, "Too long!"),
//   tag: Yup.string()
//     .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
//     .required("Required field"),
// });

export default function NoteForm() {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraft();
  const router = useRouter();

  const onClose = () => {
    router.push("/notes/filter/all");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      clearDraft();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const fieldId = useId();

  const handleSubmit = (formData: FormData) => {
    const noteData = Object.fromEntries(formData) as unknown as NewNote;
    mutate(noteData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
