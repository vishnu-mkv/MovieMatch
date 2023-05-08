import { GenreSummary } from "@/interfaces/movie";
import { getGenres } from "@/services/movies";
import React, { useEffect, useState } from "react";

function useGenres(): [GenreSummary[], boolean] {
  const [genres, setGenres] = useState<GenreSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      const _genres = await getGenres();
      setGenres(_genres);
      setLoading(false);
    }

    fetchGenres();
  }, []);
  return [genres, loading];
}

export default useGenres;
