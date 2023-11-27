import { useState } from "react";
import { apiFetch } from "../../shared";
import { useNavigate } from "react-router-dom";

export function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function valid() {
    return !!title && !!content;
  }

  function submit() {
    if (valid()) {
      setError("");

      apiFetch({ path: "/note", method: "POST", body: { title, content } })
        .then(() => {
          navigate("/");
        })
        .catch((err: Error) => {
          setError(err.message);
        });
    } else {
      setError("Title and content are both required");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={content}
        placeholder="Note content"
        onChange={(e) => setContent(e.target.value)}
      />

      <button>Submit</button>

      {error && <div>{error}</div>}
    </form>
  );
}
