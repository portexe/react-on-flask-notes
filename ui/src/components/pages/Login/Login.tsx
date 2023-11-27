import { useState } from "react";
import { apiFetch } from "../../../shared";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [un, setUn] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function valid() {
    return !!un && !!pw;
  }

  function submit() {
    if (valid()) {
      setError("");

      apiFetch({
        path: "/login",
        method: "POST",
        body: {
          email: un,
          password: pw,
        },
      })
        .then(() => {
          navigate("/");
        })
        .catch((err: Error | undefined) => {
          setError(err?.message || "Server error");
        });
    } else {
      setError("Please check your inputs and try again.");
    }
  }

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          value={un}
          placeholder="Email"
          onChange={(e) => setUn(e.target.value)}
        />

        <input
          value={pw}
          type="password"
          placeholder="Password"
          onChange={(e) => setPw(e.target.value)}
        />

        <button>Login</button>
      </form>

      <div>
        Don't have an account yet? <Link to="/register">Create one!</Link>
      </div>

      {error && <div>{error}</div>}
    </main>
  );
}
