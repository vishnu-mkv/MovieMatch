"use client";

import MovieContainer from "@/components/MovieContainer";
import { MovieSummary } from "@/interfaces/movie";
import { getMyMovies } from "@/services/movies";
import { useEffect, useState } from "react";
import Loading from "../loading";

async function MyMovies() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMovies() {
    const movies = await getMyMovies();
    setMovies(movies);
    setLoading(false);
  }

  useEffect(() => {
    if (window === undefined) return;
    loadMovies();
  }, []);

  if (loading) return <Loading />;

  return (
    <MovieContainer
      movies={movies}
      title={{
        title: "Your Movies",
        button: { text: "Add Movie", href: "/movies/new" },
      }}
      showActions={true}
    />
  );
}

export default MyMovies;
