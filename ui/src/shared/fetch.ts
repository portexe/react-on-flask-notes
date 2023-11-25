const url = "http://127.0.0.1:5000";

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

  return fetch(`${url}${path}`, {
    body: fetchBody,
    method,
    headers: {
      ...customHeaders,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
