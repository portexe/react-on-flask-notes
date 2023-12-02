/*
  Loads the command palette inside of a separate container
  than the React app's "root" div.
*/

import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export function CommandPortal({ children }: PropsWithChildren) {
  const commandPaletteContainer = document.getElementById("command-palette")!;

  return createPortal(children, commandPaletteContainer);
}
