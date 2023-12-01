import DOMPurify from "dompurify";
import { CiFileOn } from "react-icons/ci";

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
        <div
          key={note.objectID}
          className="flex items-center gap-2 pt-2 pb-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="text-2xl">
            <CiFileOn />
          </div>
          <div>
            <h4 className="font-bold">
              <SearchResultSnippet snippet={note._snippetResult.title} />
            </h4>

            <div className="text-sm font-light text-gray-500">
              <SearchResultSnippet snippet={note._snippetResult.content} />
            </div>
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
