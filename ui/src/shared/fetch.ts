const serverUrl = "http://127.0.0.1:5000";

const alreadyLoggedInMessage =
  "You can only access this endpoint when not logged in.";

// const alreadyRegisteredMessage = "is already associated with an account.";

const redirectMessages = [alreadyLoggedInMessage];

interface FetchArgs {
  path: string;
  body?: { [key: string]: unknown };
  method?: "GET" | "POST" | "PUT" | "DELETE";
  customHeaders?: HeadersInit;
}

export function apiFetch({
  path,
  body,
  method = "GET",
  customHeaders = {},
}: FetchArgs) {
  const fetchBody = body ? JSON.stringify(body) : undefined;

  const xsrfCookie = getCookie("XSRF-TOKEN");

  return fetch(`${serverUrl}${path}`, {
    body: fetchBody,
    method,
    mode: "cors",
    credentials: "include",
    headers: {
      ...customHeaders,
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfCookie,
    },
  }).then(async (res) => {
    if (`${res.status}`.startsWith("2") && path !== "/logout")
      return res.json();

    if (requestIsUnauthorized(res, path)) {
      redirect("/login");
    } else if (res.status === 400) {
      const json = await res.json();
      const errors: string[] | undefined = json?.response?.errors;

      if (!errors?.length) {
        throw new Error("Server error");
      } else {
        const redirected = redirectIfAlreadyExists(json.response.errors);

        if (redirected) return;

        throw new Error(errors[0]);
      }
    } else {
      throw new Error("Server error");
    }
  });
}

function redirectIfAlreadyExists(errors: string[]) {
  for (const message of redirectMessages) {
    if (errors.find((error) => error.includes(message))) {
      redirect("/");
      return true;
    }
  }

  return false;
}

function requestIsUnauthorized(res: Response, path: string) {
  return res.status === 401 || (res.status === 200 && path === "/logout");
}

function redirect(path: string) {
  window.location.href = path;
}

function getCookie(name: string) {
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
  }

  return "";
}
