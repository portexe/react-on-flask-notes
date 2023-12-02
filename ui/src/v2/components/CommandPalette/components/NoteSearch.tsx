import { CiSearch } from "react-icons/ci";

import { NoteSearchInput } from "./";

export function NoteSearch({
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
