export default function ErrorFallback({ error }) {
    return (
        <div className="mt-15" role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}