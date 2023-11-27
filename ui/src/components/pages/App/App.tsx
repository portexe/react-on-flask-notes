import { useState, useEffect } from "react";
import { Note } from "../../../types";
import { NotePreview } from "../..";
import { apiFetch } from "../../../shared";
import { Link } from "react-router-dom";

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch({ path: "/notes" })
      .then((res) => setNotes(res.notes))
      .catch(() => setError("Server error"));
  }, []);

  function logOut() {
    apiFetch({ path: "/logout", method: "POST" });
  }

  return (
    <main>
      <button onClick={logOut}>Log Out</button>

      <Link to="/new">
        <button type="button">Add Note</button>
      </Link>

      {error && <p>{error}</p>}

      {notes.length === 0 && <h3>No notes yet!</h3>}

      {notes.map((note) => (
        <Link key={note.id} to={`/note/${note.id}`}>
          <NotePreview note={note} />
        </Link>
      ))}
    </main>
  );
}
