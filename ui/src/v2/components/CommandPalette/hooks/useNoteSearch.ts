import { useEffect, useState } from "react";

import { apiFetch } from "../../../../shared";
import { useDebounce } from "../../../hooks";

import type { NoteSearchResult } from "../../../../types";

interface Args {
  open: boolean;
  searchTerm: string;
}

export function useNoteSearch({ searchTerm, open }: Args) {
  const [searchResults, setSearchResults] = useState<NoteSearchResult[]>();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!open) {
      setSearchResults(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !debouncedSearchTerm) return setSearchResults(undefined);

    apiFetch({
      path: "/search",
      method: "POST",
      body: { term: debouncedSearchTerm },
    }).then((res) => {
      setSearchResults(res.notes);
    });
  }, [debouncedSearchTerm, open]);

  return searchResults;
}
