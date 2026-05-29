import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";
import { cx } from "./ui";

/**
 * Standard authenticated/guest page frame: background, fixed navbar, a
 * consistently-spaced main region, and footer. Keeps every page aligned to the
 * same width, gutters, and navbar offset.
 */
const Shell = ({ isLoggedIn = false, loading = false, footer = true, className, children }) => (
  <div className="app-bg">
    <Loading isLoading={loading} />
    <Navbar isLoggedIn={isLoggedIn} />
    <main className={cx("page-main", className)}>{children}</main>
    {footer && <Footer isLoggedIn={isLoggedIn} />}
  </div>
);

export default Shell;
