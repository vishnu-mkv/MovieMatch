import MovieContainer from "@/components/MovieContainer";
import { getMovies } from "@/services/movies";
import React from "react";

async function Movies() {
  const data = await getMovies();
  return (
    <MovieContainer
      title={{ title: "All Movies" }}
      movies={data}
    ></MovieContainer>
  );
}

export default Movies;
