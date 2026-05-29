// Central API configuration.
// Override per-environment with REACT_APP_API_BASE_URL in a .env file.
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://quiz-master-backend-1a1s.onrender.com/api";

/**
 * Thin fetch wrapper that always targets the API base, sends cookies,
 * and returns parsed JSON. Throws an Error (with the server message when
 * available) on non-2xx responses so callers can use try/catch.
 */
export async function apiFetch(path, { method = "GET", body, headers, signal } = {}) {
  const isFormData = body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    signal,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: isFormData ? body : body != null ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
