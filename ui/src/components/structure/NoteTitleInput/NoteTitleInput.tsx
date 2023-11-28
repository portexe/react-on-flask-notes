interface Props {
  value?: string;
}

export function NoteTitleInput({ value = "" }: Props) {
  return (
    <label>
      Title
      <input
        placeholder="Title"
        name="title"
        defaultValue={value}
        className="w-full border-indigo-200 border-2 p-2 rounded"
      />
    </label>
  );
}
