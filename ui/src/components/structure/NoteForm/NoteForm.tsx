import { PropsWithChildren, useState } from "react";
import { FormSubmitArg } from "../../../types";

interface Props {
  onSubmit: (values: FormSubmitArg) => void;
  validation?: (values: FormSubmitArg) => boolean;
}

export function NoteForm({
  children,
  onSubmit,
  validation = () => true,
}: PropsWithChildren<Props>) {
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(
          formData.entries()
        ) as FormSubmitArg;

        if (validation(formValues)) {
          onSubmit(formValues);
        } else {
          setError("Please check your inputs");
        }
      }}
      className="flex flex-col items-center"
    >
      <div className="flex justify-end w-full p-2">
        <button className="p-3 bg-teal-300 rounded text-black w-24">
          Submit
        </button>
      </div>

      <div className="p-5 max-w-2xl flex flex-col gap-4 w-full">{children}</div>

      {error && <div>{error}</div>}
    </form>
  );
}
