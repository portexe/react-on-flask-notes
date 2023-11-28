import { useEffect, useState } from "react";
import type { FormSubmitArg, Note } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../../shared";
import { NoteContentInput, NoteForm, NoteTitleInput } from "../..";

export function Note() {
  const [note, setNote] = useState<Note>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    apiFetch({ path: `/note/${id}` })
      .then((res) => {
        setNote(res.note);
        setLoading(false);
      })
      .catch((err: Error | undefined) => {
        setLoading(false);
        setError(err?.message || "Error fetching note");
      });
  }, [id]);

  if (!id) return <div>Something went terribly wrong</div>;

  if (loading) return <div>Loading...</div>;

  if (!note) return <div>You don't have a note with this ID</div>;

  function submit({ title, content }: FormSubmitArg) {
    if (title === note?.title && content === note?.content) {
      setError("Nothing has changed.");
    } else {
      setError("");

      apiFetch({
        path: `/note/${id}`,
        method: "PUT",
        body: { title, content },
      })
        .then(() => navigate("/"))
        .catch((err: Error | undefined) =>
          setError(err?.message || "Error updating note")
        );
    }
  }

  function validation({ title, content }: FormSubmitArg) {
    return !!title && !!content;
  }

  function deleteNote() {
    if (window.confirm("Are you sure you want to delete this note?")) {
      apiFetch({
        path: `/note/${id}`,
        method: "DELETE",
      })
        .then(() => navigate("/"))
        .catch((err: Error | undefined) =>
          setError(
            err?.message ||
              "Error deleting note. Refresh the page and try again."
          )
        );
    }
  }

  return (
    <div>
      <NoteForm onSubmit={submit} validation={validation}>
        <NoteTitleInput value={note.title} />

        <NoteContentInput value={note.content} />
      </NoteForm>

      <button type="button" onClick={deleteNote}>
        Delete Note
      </button>

      {error && <div>{error}</div>}
    </div>
  );
}
