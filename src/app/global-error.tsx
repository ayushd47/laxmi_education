'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Something went wrong!</h1>
          <p>{error.message || 'An unexpected error occurred'}</p>
          <button
            onClick={reset}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}


