/*
  The all-in-one command interface for the app.
  Contains all the logic for searching Notes,
  along with site-wide commands.
*/

import DOMPurify from "dompurify";
import { CiFileOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  Backdrop,
  NoteSearch,
  ModalSection,
  CommandPortal,
  ModalSectionCommand,
  SearchResult,
} from "./components";
import { useCommandNavigation, useNoteSearch } from "./hooks";
import { useCommandPortal, useKeyPressListener } from "../../hooks";

import { CommandCategory, type CommandPaletteItem } from "../../../types";

interface Props {
  commandItems?: CommandPaletteItem[];
}

const defaultCommandItems: CommandPaletteItem[] = [];

export function CommandPalette({ commandItems = defaultCommandItems }: Props) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [commandItemsWithSearchResults, setCommandItemsWithSearchResults] =
    useState<CommandPaletteItem[]>(commandItems);

  const goTo = useNavigate();

  const searchResults = useNoteSearch({ open, searchTerm });

  const portalReady = useCommandPortal(open);

  const { items, selected } = useCommandNavigation(
    commandItemsWithSearchResults,
    open
  );

  useKeyPressListener({
    key: "k",
    meta: true,
    listener: () => {
      setOpen(true);
    },
  });

  useKeyPressListener({
    key: "Escape",
    listener: () => setOpen(false),
  });

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
    }
  }, [open]);

  useEffect(() => {
    if (!searchResults) {
      setCommandItemsWithSearchResults(commandItems);
      return;
    }

    const searchResultsAsModalItems = searchResults.map((r) => ({
      icon: CiFileOn,
      key: `searchResult-${r.objectID}`,
      category: CommandCategory.SearchResult,
      action: () => goTo(`/note/${r.objectID}`),
      text: {
        header: DOMPurify.sanitize(r._snippetResult.title.value, {
          ALLOWED_TAGS: ["em"],
        }),
        content: DOMPurify.sanitize(r._snippetResult.content.value, {
          ALLOWED_TAGS: ["em"],
        }),
      },
    }));

    setCommandItemsWithSearchResults([
      ...searchResultsAsModalItems,
      ...commandItems,
    ]);
  }, [searchResults, commandItems, goTo]);

  if (!open || !portalReady) return null;

  return (
    <CommandPortal>
      <Modal>
        <ModalSection margin="small" clickable={false}>
          <NoteSearch searchValue={searchTerm} setSearchValue={setSearchTerm} />
        </ModalSection>

        {Array.isArray(searchResults) && (
          <ModalSection clickable={false}>
            {items
              .filter((each) => each.category === CommandCategory.SearchResult)
              .map((item) => (
                <SearchResult
                  key={item.key}
                  item={item}
                  selected={selected.key === item.key}
                />
              ))}
          </ModalSection>
        )}

        {items
          .filter((each) => each.category === CommandCategory.AppLevelCommand)
          .map((i) => (
            <ModalSection
              key={i.key}
              focused={selected.key === i.key}
              onClick={i.action}
            >
              <ModalSectionCommand icon={i.icon} text={i.text.content} />
            </ModalSection>
          ))}
      </Modal>

      <Backdrop closeEvent={() => setOpen(false)} />
    </CommandPortal>
  );
}
