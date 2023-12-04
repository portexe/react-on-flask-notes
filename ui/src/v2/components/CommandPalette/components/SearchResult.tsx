import type {
  CommandPaletteItem,
  SearchResultSnippet,
} from "../../../../types";

import styles from "./styles.module.css";

interface Props {
  selected: boolean;
  item: CommandPaletteItem;
}

export function SearchResult({ item, selected }: Props) {
  const {
    icon,
    action,
    text: { header, content },
  } = item;

  if (!header) {
    throw Error("Header is required");
  }

  return (
    <div
      onClick={action}
      className={`flex items-center gap-2 pt-2 pb-2 cursor-pointer hover:bg-gray-100 ${
        selected && "bg-gray-100"
      }`}
    >
      <div className="text-2xl">{icon({})}</div>
      <div>
        <h4 className="font-bold">
          <SearchResultSnippet snippet={header} />
        </h4>

        <div className="text-sm font-light text-gray-500">
          <SearchResultSnippet snippet={content} />
        </div>
      </div>
    </div>
  );
}

interface SearchResultSnippetProps {
  snippet: string;
}

// Already sanitized by this point
function SearchResultSnippet({ snippet }: SearchResultSnippetProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: snippet }}
      className={styles.searchResult}
    ></div>
  );
}
