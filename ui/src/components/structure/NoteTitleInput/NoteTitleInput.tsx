interface Props {
  value?: string;
}

export function NoteTitleInput({ value = "" }: Props) {
  return <input placeholder="Title" name="title" defaultValue={value} />;
}
