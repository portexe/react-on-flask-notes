/*
  The all-in-one command interface for the app.
  Contains all the logic for searching Notes,
  along with site-wide commands.
*/

import { useEffect, useState } from "react";
import { CiLogout, CiCirclePlus } from "react-icons/ci";

import {
  Modal,
  Backdrop,
  NoteSearch,
  ModalSection,
  CommandPortal,
  NoteSearchResults,
  ModalSectionCommand,
} from "./components";
import {
  useDebounce,
  useCommandPortal,
  useKeyPressListener,
} from "../../hooks";
import {} from "..";
import { apiFetch } from "../../../shared";

import type { NoteSearchResult } from "../../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  closeEvent: () => void;
}

// All items in the modal aside from search results.
const defaultItems = ["search", "createNote", "logOut"];

export function CommandPalette({ open, closeEvent }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<NoteSearchResult[]>();

  // Focused item is the index used to access items.
  // For example: const currentItem = items[focusedItem].
  // This is incremented/decremented via the arrow keys.
  const [focusedItem, setFocusedItem] = useState(0);
  const [items, setItems] = useState<string[]>(defaultItems);

  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const portalReady = useCommandPortal(open);

  const navigate = useNavigate();

  function logOut() {
    apiFetch({ path: "/logout", method: "POST" });
  }

  function goToCreateNote() {
    navigate("/new");
  }

  function goToNote(id: string) {
    navigate(`/note/${id}`);
  }

  function moveItem(direction: 1 | -1) {
    if (!open) return;

    setFocusedItem((f) => {
      // If the current focus index is 0 and we hit UP, we
      // cycle to the last item.
      if (f <= 1 && direction === -1) return items.length - 1;

      // And vise versa for the last item and DOWN.
      if (f + 1 === items.length && direction === 1) return 1;

      return f + direction;
    });
  }

  function itemSelect() {
    const itemSelected = items[focusedItem];

    switch (itemSelected) {
      case "createNote": {
        goToCreateNote();
        break;
      }

      case "logOut": {
        logOut();
        break;
      }

      default: {
        if (itemSelected.includes("searchResult-")) {
          const objectID = itemSelected.split("searchResult-")[1];
          goToNote(objectID);
        }

        break;
      }
    }
  }

  useKeyPressListener({
    key: "Escape",
    listener: closeEvent,
  });

  useKeyPressListener({
    key: "ArrowUp",
    listener: () => moveItem(-1),
  });

  useKeyPressListener({
    key: "ArrowDown",
    listener: () => moveItem(1),
  });

  useKeyPressListener({
    key: "Enter",
    listener: itemSelect,
  });

  useEffect(() => {
    if (!open || !debouncedSearchTerm) {
      setSearchValue("");
      setSearchResults(undefined);
      setFocusedItem(0);
      return;
    }

    apiFetch({
      path: "/search",
      method: "POST",
      body: { term: debouncedSearchTerm },
    }).then((res) => {
      setSearchResults(res.notes);
    });
  }, [debouncedSearchTerm, open]);

  useEffect(() => {
    setFocusedItem(1);

    if (!searchResults?.length) {
      setItems(defaultItems);
    } else {
      const resultIDs = searchResults.map((r) => `searchResult-${r.objectID}`);

      setItems(() => [defaultItems[0], ...resultIDs, ...defaultItems.slice(1)]);
    }
  }, [searchResults]);

  if (!open || !portalReady) return null;

  return (
    <CommandPortal>
      <Modal>
        <ModalSection margin="small" clickable={false}>
          <NoteSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </ModalSection>

        {Array.isArray(searchResults) && (
          <ModalSection clickable={false}>
            <div className="ml-8 text-xs">Search Results:</div>
            <NoteSearchResults
              notes={searchResults}
              focusedItem={items[focusedItem]}
              onNoteClick={goToNote}
            />
          </ModalSection>
        )}

        <ModalSection
          focused={items[focusedItem] === "createNote"}
          onClick={goToCreateNote}
        >
          <ModalSectionCommand
            text="Create Note"
            icon={CiCirclePlus}
            onAction={() => console.log("Create note click")}
          />
        </ModalSection>

        <ModalSection
          focused={items[focusedItem] === "logOut"}
          onClick={logOut}
        >
          <ModalSectionCommand
            text="Log Out"
            icon={CiLogout}
            onAction={() => console.log("Log out click")}
          />
        </ModalSection>
      </Modal>

      <Backdrop closeEvent={closeEvent} />
    </CommandPortal>
  );
}
