interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export function NoteSearchInput({ value, onChange }: Props) {
  return (
    <input
      autoFocus
      value={value}
      placeholder="Search Notes"
      onChange={(e) => {
        const val = e.target.value;
        const processedValue = val.trimStart().replace(/\s+/g, " ");
        onChange(processedValue);
      }}
      className="w-full focus:outline-none"
    />
  );
}
