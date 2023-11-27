import { apiFetch } from "../../../shared";
import { useNavigate } from "react-router-dom";
import { NoteContentInput, NoteForm, NoteTitleInput } from "../..";
import { FormSubmitArg } from "../../../types";

export function NewNote() {
  const navigate = useNavigate();

  function validation({ title, content }: FormSubmitArg) {
    return !!title && !!content;
  }

  function submit({ title, content }: FormSubmitArg) {
    apiFetch({ path: "/note", method: "POST", body: { title, content } }).then(
      () => navigate("/")
    );
  }

  return (
    <NoteForm onSubmit={submit} validation={validation}>
      <NoteTitleInput />

      <NoteContentInput />
    </NoteForm>
  );
}
