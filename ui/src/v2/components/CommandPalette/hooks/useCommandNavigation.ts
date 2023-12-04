import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";

import { apiFetch } from "../../../../shared";
import { useKeyPressListener } from "../../../hooks";

import { CommandCategory, type CommandPaletteItem } from "../../../../types";

export function useCommandNavigation(
  items: CommandPaletteItem[],
  open: boolean
) {
  const [itemIndex, setItemIndex] = useState<number>(0);

  const itemsThatAreAlwaysPresent: CommandPaletteItem[] = [
    {
      key: "logOut",
      text: {
        content: "Log Out",
      },
      icon: CiLogout,
      action: logOut,
      category: CommandCategory.AppLevelCommand,
    },
  ];

  const commandPaletteItems = [...items, ...itemsThatAreAlwaysPresent];

  useKeyPressListener({
    key: "ArrowUp",
    listener: () =>
      setItemIndex((idx) => moveItem(-1, idx, commandPaletteItems, open)),
  });

  useKeyPressListener({
    key: "ArrowDown",
    listener: () =>
      setItemIndex((idx) => moveItem(1, idx, commandPaletteItems, open)),
  });

  useKeyPressListener({
    key: "Enter",
    listener: (evt: KeyboardEvent) => {
      evt.preventDefault();

      if (!open) return;

      commandPaletteItems[itemIndex].action();
    },
  });

  useEffect(() => {
    setItemIndex(0);
  }, [open]);

  return {
    items: commandPaletteItems,
    selected: commandPaletteItems[itemIndex],
  };
}

function logOut() {
  apiFetch({ path: "/logout", method: "POST" });
}

function moveItem(
  direction: 1 | -1,
  itemIndex: number,
  items: CommandPaletteItem[],
  open: boolean
) {
  if (!open) return 0;

  // If the current focus index is 0 and we hit UP, we
  // cycle to the last item.
  if (itemIndex <= 0 && direction === -1) return itemIndex;

  // And vise versa for the last item and DOWN.
  if (itemIndex + 1 === items.length && direction === 1) return itemIndex;

  return itemIndex + direction;
}
