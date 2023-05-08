import { Movie } from "@/interfaces/movie";
import { getMovieById } from "@/services/movies";
import React, { useEffect, useState } from "react";

function useMovie(id: string): [Movie | null, boolean] {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      const res = await getMovieById(id);
      setMovie(res);
      setLoading(false);
    }

    fetchMovie();
  }, [id]);

  return [movie, loading];
}

export default useMovie;
