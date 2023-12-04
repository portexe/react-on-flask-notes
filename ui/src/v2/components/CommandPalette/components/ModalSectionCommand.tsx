/*
  This is a general component for rows in the command
  palette that host non-dynamic commands such as
  logging out, creating a new note, etc.
*/

import { IconType } from "react-icons";

interface Props {
  text: string;
  icon: IconType;
}

export function ModalSectionCommand({ icon, text }: Props) {
  return (
    <div className="flex items-center gap-2 text-xl">
      {icon({})}
      {text}
    </div>
  );
}
