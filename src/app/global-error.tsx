"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", background: "#0B1B3F", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
          <div style={{ maxWidth: "34rem" }}>
            <p style={{ color: "#4DA3FF", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Practice Care Source</p>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.1 }}>We hit an unexpected problem.</h1>
            <p style={{ color: "#DCE7F7", lineHeight: 1.7 }}>The website could not load this page. Please try again or return to the homepage.</p>
            <button
              type="button"
              onClick={() => reset()}
              style={{ marginTop: "1.5rem", minHeight: "3rem", border: 0, borderRadius: "999px", padding: "0 1.5rem", background: "#2F5BFF", color: "#fff", fontWeight: 700, cursor: "pointer" }}
            >
              Try again
            </button>
            <p><a href="/" style={{ color: "#B8DFFF" }}>Back to homepage</a></p>
          </div>
        </main>
      </body>
    </html>
  );
}
