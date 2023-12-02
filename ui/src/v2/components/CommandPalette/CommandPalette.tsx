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

interface Props {
  open: boolean;
  closeEvent: () => void;
}

export function CommandPalette({ open, closeEvent }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<NoteSearchResult[]>();

  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const portalReady = useCommandPortal(open);
  useKeyPressListener({
    key: "Escape",
    listener: closeEvent,
  });

  useEffect(() => {
    if (!open || !debouncedSearchTerm) {
      setSearchValue("");
      setSearchResults(undefined);
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
            <NoteSearchResults notes={searchResults} />
          </ModalSection>
        )}

        <ModalSection>
          <ModalSectionCommand
            text="Create Note"
            icon={CiCirclePlus}
            onAction={() => console.log("Create note click")}
          />
        </ModalSection>

        <ModalSection>
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
