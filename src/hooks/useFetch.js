import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPending(true);
    const abortController = new AbortController(); // Create a new abort controller

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const result = await response.json();
        setData(result);
        setPending(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
          console.error("Error fetching data:", error);
        }
        setPending(false);
      }
    };

    if (url) {
      fetchData();
    } else {
      setPending(false); // If no URL, set pending to false
    }

    return () => {
      abortController.abort(); // Abort the fetch on cleanup
    };
  }, [url]);

  return [data, pending, error];
}
