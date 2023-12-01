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
import { CiSearch, CiLogout, CiCirclePlus } from "react-icons/ci";

interface Props {
  open: boolean;
  closeEvent: () => void;
}

export function CommandPalette({ open, closeEvent }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<NoteSearchResult[]>();

  const debouncedSearchTerm = useDebounce(searchValue, 1000);
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
          <NoteSearchSection
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
          <div className="flex items-center gap-2 text-xl">
            <CiCirclePlus />
            Create Note
          </div>
        </ModalSection>

        <ModalSection>
          <div className="flex items-center gap-2 text-xl">
            <CiLogout />
            Log Out
          </div>
        </ModalSection>
      </Modal>

      <Backdrop closeEvent={closeEvent} />
    </CommandPortal>
  );
}

function NoteSearchSection({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (val: string) => void;
}) {
  return (
    <search className="flex items-center gap-1">
      <CiSearch />
      <NoteSearchInput value={searchValue} onChange={setSearchValue} />
    </search>
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
      className="absolute top-0 left-0 z-0 w-full h-full bg-zinc-300"
    ></div>
  );
}

function Modal({ children }: PropsWithChildren) {
  return (
    <div className="z-10 flex flex-col max-w-full overflow-auto bg-white rounded-lg max-h-comfortable w-160 400 drop-shadow-lg">
      {children}
    </div>
  );
}

type ModalSectionProps = PropsWithChildren & {
  clickable?: boolean;
  margin?: "small" | "medium" | "large";
};

function ModalSection({
  children,
  margin = "medium",
  clickable = true,
}: ModalSectionProps) {
  return (
    <div
      className={`border-b-2 border-gray-200 p-4 ${
        clickable && "hover:bg-gray-100 cursor-pointer"
      } ${
        margin === "small" ? "pb-4" : margin === "medium" ? "pb-6" : "pb-8"
      } ${margin === "small" ? "pt-4" : margin === "medium" ? "pt-6" : "pt-8"}`}
    >
      {children}
    </div>
  );
}
