import { useState, useEffect } from "react";
import { Note } from "../../types";
import { NotePreview } from "..";
import { apiFetch } from "../../shared";

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch({ path: "/notes" })
      .then((res) => setNotes(res.notes))
      .catch(() => setError("Server error"));
  }, []);

  return (
    <main>
      {error && <p>{error}</p>}

      {notes.length === 0 && <h3>No notes yet!</h3>}

      {notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </main>
  );
}
