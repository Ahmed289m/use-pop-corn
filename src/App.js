import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Box from "./components/Box";
import { NumOfResult } from "./components/NavBar";
import { MoviesList } from "./components/MoviesBox";
import { WatchedMoviesList, MoviesSummary } from "./components/WatchedBox";
import { Search } from "./components/NavBar";

import Loading from "./components/Loading";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  function handleAddToWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function HandleSelectingMovie(id) {
    setSelectedId((selected) => (selected === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumOfResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={HandleSelectingMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddToWatched={handleAddToWatched}
              watched={watched}
            />
          ) : (
            <>
              <MoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>🚫</span>
      {error}
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
