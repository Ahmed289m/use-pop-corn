import { useEffect, useState } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=2f4121b4&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something is wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");

          setMovies(data.Search);
        } catch (error) {
          if (error.name !== "The operation was aborted") {
            console.error(error);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
          setError("");
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
