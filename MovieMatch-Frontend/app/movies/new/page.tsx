"use client";

import Loading from "@/app/loading";
import { FormContainer, FormProps } from "@/components/Form";
import {
  GenreSummary,
  MovieFormData,
  MovieSummary,
  movieForm,
} from "@/interfaces/movie";
import { getGenres, postMovie } from "@/services/movies";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const genres: number[] = [];

const movie: MovieFormData = {
  description: "",
  director: "",
  genres,
  picture: undefined,
  title: "",
  releasedOn: new Date(),
};

const MovieFormOptions: FormProps<MovieFormData, GenreSummary> = {
  ...movieForm,
  initial: movie,
  title: "Add Movie",
};

function page() {
  const [genres, setGenres] = useState<GenreSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchGenres() {
      const _genres = await getGenres();
      setGenres(_genres);
      setLoading(false);

      MovieFormOptions.fields.push({
        label: "Genres",
        name: "genres",
        type: "select",
        input: "select",
        select: {
          multiple: true,
          data: _genres,
          getName: (g) => g.name,
          getValue: (g) => g.id.toString(),
        },
        onChange: (e) => {
          return e;
        },
      });
    }
    fetchGenres();
  }, []);

  if (loading) return <Loading />;

  async function onSubmit(data: any, e: FormEvent) {
    const formData = new FormData(e.target as any);
    const res = await postMovie(formData);
    router.push("/movies/" + res.id);
  }
  return (
    <div>
      <FormContainer {...MovieFormOptions} onSubmit={onSubmit}></FormContainer>
    </div>
  );
}

export default page;
