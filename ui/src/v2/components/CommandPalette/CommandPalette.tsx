import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useCommandPortal,
  useDebounce,
  useKeyPressListener,
} from "../../hooks";
import { NoteSearchInput, NoteSearchResults } from "..";
import { apiFetch } from "../../../shared";
import { NoteSearchResult } from "../../../types";

interface Props {
  open: boolean;
  closeEvent: () => void;
}

export function CommandPalette({ open, closeEvent }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<NoteSearchResult[]>([]);

  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const portalReady = useCommandPortal(open);
  useKeyPressListener({
    key: "Escape",
    listener: closeEvent,
  });

  useEffect(() => {
    if (!open || !debouncedSearchTerm) {
      setSearchValue("");
      setSearchResults([]);
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
        <ModalSection>
          <NoteSearchSection
            searchValue={searchValue}
            searchResults={searchResults}
            setSearchValue={setSearchValue}
          />
        </ModalSection>

        <ModalSection>Create Note</ModalSection>

        <ModalSection>Log Out</ModalSection>
      </Modal>

      <Backdrop closeEvent={closeEvent} />
    </CommandPortal>
  );
}

function NoteSearchSection({
  searchValue,
  searchResults,
  setSearchValue,
}: {
  searchValue: string;
  searchResults: NoteSearchResult[];
  setSearchValue: (val: string) => void;
}) {
  return (
    <>
      <search className="pb-2 mb-4">
        <NoteSearchInput value={searchValue} onChange={setSearchValue} />
      </search>

      <NoteSearchResults notes={searchResults} />
    </>
  );
}

function CommandPortal({ children }: PropsWithChildren) {
  const commandPaletteContainer = document.getElementById("command-palette")!;

  return createPortal(children, commandPaletteContainer);
}

function Backdrop({ closeEvent }: { closeEvent: () => void }) {
  return (
    <div
      onClick={closeEvent}
      className="z-0 w-full h-full absolute top-0 left-0 bg-zinc-300"
    ></div>
  );
}

function Modal({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-96 max-w-full max-h-full bg-white 400 z-10 drop-shadow-lg rounded-lg p-6">
      {children}
    </div>
  );
}

function ModalSection({ children }: PropsWithChildren) {
  return <div className="border-b-2 border-gray-400 pb-4 mb-4">{children}</div>;
}
