import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgb(var(--surface))",
            color: "rgb(var(--fg))",
            border: "1px solid rgb(var(--line))",
            borderRadius: "12px",
            fontSize: "14px",
            boxShadow: "0 12px 28px -8px rgb(15 23 42 / 0.18)",
          },
          success: { iconTheme: { primary: "rgb(var(--primary))", secondary: "rgb(var(--surface))" } },
          error: { iconTheme: { primary: "rgb(var(--error))", secondary: "rgb(var(--surface))" } },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
