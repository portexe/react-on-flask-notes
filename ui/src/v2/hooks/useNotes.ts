import { useState, useEffect } from "react";
import { apiFetch } from "../../shared";
import { Note } from "../../types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch({ path: "/notes" })
      .then((res) => setNotes(res.notes))
      .catch(() => setError("Server error"));
  }, []);

  return { notes, error };
}
