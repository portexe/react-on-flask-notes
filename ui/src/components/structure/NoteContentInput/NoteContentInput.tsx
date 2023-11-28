interface Props {
  value?: string;
}

export function NoteContentInput({ value = "" }: Props) {
  return (
    <label className="flex flex-col">
      Content
      <textarea
        placeholder="Note Content"
        name="content"
        defaultValue={value}
        className="p-2 rounded resize-none border-indigo-200 border-2"
      />
    </label>
  );
}
