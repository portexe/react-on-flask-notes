/*
  This is a general component for rows in the command
  palette that host non-dynamic commands such as
  logging out, creating a new note, etc.
*/

import { IconType } from "react-icons";

interface Props {
  text: string;
  icon: IconType;
  onAction: () => void;
}

export function ModalSectionCommand({ icon, text, onAction }: Props) {
  return (
    <div onClick={onAction} className="flex items-center gap-2 text-xl">
      {icon({})}
      {text}
    </div>
  );
}
