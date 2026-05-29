import { useEffect, useState } from "react";
import { apiFetch } from "../config/api";

/**
 * Returns the current login status.
 *   isLoggedIn === null  -> still checking
 *   isLoggedIn === true  -> authenticated
 *   isLoggedIn === false -> guest
 */
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    let active = true;
    apiFetch("/check-login-status")
      .then((data) => active && setIsLoggedIn(Boolean(data?.isLoggedIn)))
      .catch(() => active && setIsLoggedIn(false));
    return () => {
      active = false;
    };
  }, []);

  return { isLoggedIn };
}
