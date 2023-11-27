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
    >
      {children}

      <button>Submit</button>

      {error && <div>{error}</div>}
    </form>
  );
}
