import DOMPurify from "dompurify";

import type { NoteSearchResult, SearchResultSnippet } from "../../../types";

import styles from "./styles.module.css";

interface Props {
  notes: NoteSearchResult[];
}

export function NoteSearchResults({ notes }: Props) {
  if (!notes.length) return <div>No results</div>;

  return (
    <div>
      {notes.map((note) => (
        <div key={note.objectID} className="pt-2 pb-2">
          <h4 className="font-bold">
            <SearchResultSnippet snippet={note._snippetResult.title} />
          </h4>

          <div className="text-sm text-gray-500 font-light">
            <SearchResultSnippet snippet={note._snippetResult.content} />
          </div>
        </div>
      ))}
    </div>
  );
}

interface SearchResultSnippetProps {
  snippet: SearchResultSnippet;
}

function SearchResultSnippet({ snippet }: SearchResultSnippetProps) {
  if (snippet.matchLevel === "none") return <div>{snippet.value}</div>;

  const clean = DOMPurify.sanitize(snippet.value, { ALLOWED_TAGS: ["em"] });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: clean }}
      className={styles.searchResult}
    ></div>
  );
}
