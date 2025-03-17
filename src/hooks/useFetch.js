import { useEffect, useState } from "react";

// Base URL for the API
const API_BASE_URL = "http://localhost:5000";

export function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPending(true);
    const abortController = new AbortController(); // Create a new abort controller

    const fetchData = async () => {
      try {
        // Only fetch if endpoint is provided
        if (!endpoint) {
          setPending(false);
          return;
        }

        // Construct the full URL
        const url = endpoint.startsWith("http")
          ? endpoint
          : `${API_BASE_URL}${endpoint}`;

        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
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

    fetchData();

    return () => {
      abortController.abort(); // Abort the fetch on cleanup
    };
  }, [endpoint]);

  return [data, pending, error];
}
