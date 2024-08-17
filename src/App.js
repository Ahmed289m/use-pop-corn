import { useState } from "react";
import NavBar from "./components/NavBar";
import Box from "./components/Box";
import { tempMovieData } from "./components/StaticData";
import { NumOfResult } from "./components/NavBar";
import { MoviesList } from "./components/MoviesBox";
import { WatchedMoviesList, MoviesSummary } from "./components/WatchedBox";
import { tempWatchedData } from "./components/StaticData";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <NumOfResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>

        <Box>
          <MoviesSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
