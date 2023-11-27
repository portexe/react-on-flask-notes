import { useState } from "react";
import { apiFetch } from "../../../shared";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [un, setUn] = useState("");
  const [pw, setPw] = useState("");
  const [verifyPw, setVerifyPw] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function valid() {
    return !!un && !!pw && pw === verifyPw;
  }

  function submit() {
    if (valid()) {
      setError("");

      apiFetch({
        path: "/register",
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
      setError(
        "Please check your inputs and try again. Are you sure the passwords match?"
      );
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

        <input
          value={verifyPw}
          type="password"
          placeholder="Verify Password"
          onChange={(e) => setVerifyPw(e.target.value)}
        />

        <button>Sign Up</button>
      </form>

      <div>
        Already have an account? <Link to="/login">Log in!</Link>
      </div>

      {error && <div>{error}</div>}
    </main>
  );
}
