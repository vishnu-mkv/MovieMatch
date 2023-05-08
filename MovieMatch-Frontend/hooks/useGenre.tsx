import { Genre } from "@/interfaces/movie";
import { getGenreById } from "@/services/movies";
import { useEffect, useState } from "react";

function useGenre(id: string): [Genre | null, boolean] {
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState<Genre | null>(null);

  useEffect(() => {
    async function fetchGenre() {
      setLoading(true);
      const res = await getGenreById(id);
      setGenre(res);
      setLoading(false);
    }

    fetchGenre();
  }, [id]);

  return [genre, loading];
}

export default useGenre;
