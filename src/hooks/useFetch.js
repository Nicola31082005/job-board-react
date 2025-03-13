export async function useFetch(url) {
  const [pending, setPending] = useState(true);
  try {
    const response = await fetch(url);
    setPending(false);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return [data, pending];
  } catch (error) {
    setPending(false);
    console.error("Error fetching data:", error);
    throw error;
  }
}
