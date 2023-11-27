interface Props {
  value?: string;
}

export function NoteContentInput({ value = "" }: Props) {
  return (
    <textarea placeholder="Note Content" name="content" defaultValue={value} />
  );
}
