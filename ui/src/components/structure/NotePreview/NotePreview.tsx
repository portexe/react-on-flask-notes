import { Note } from "../../../types";

interface Props {
  note: Note;
}

export function NotePreview({ note }: Props) {
  return (
    <div>
      <h3>{note.title}</h3>

      <p>{note.content.slice(0, 50)}...</p>
    </div>
  );
}
