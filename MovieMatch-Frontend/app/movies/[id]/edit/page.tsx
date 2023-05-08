"use client";

import React, { useEffect } from "react";
import { pageProps } from "../page";
import useMovie from "@/hooks/useMovie";
import Loading from "@/app/loading";
import NotFound from "@/components/NotFound";
import { GenreSummary, MovieFormData, movieForm } from "@/interfaces/movie";
import { FormContainer, FormProps } from "@/components/Form";
import useGenres from "@/hooks/useGenres";
import { useRouter } from "next/navigation";
import { updateMovie } from "@/services/movies";

function EditMovie({ params: { id } }: pageProps) {
  const [movie, loading] = useMovie(id);
  const [genres, gLoading] = useGenres();
  const router = useRouter();

  const MovieFormOptions: FormProps<MovieFormData, GenreSummary> = {
    ...movieForm,
    initial: {
      description: movie?.description,
      director: movie?.director,
      title: movie?.title,
      genres: movie?.genres.map((g) => {
        return { value: g.id.toString(), label: g.name };
      }),
      picture: undefined,
      releasedOn: movie?.releasedOn,
    } as any,
    title: "Edit Movie",
    onSubmit: async function (d, e) {
      if (!movie?.id) return;
      const data = new FormData(e.target as any);
      data.append("id", movie?.id.toString());
      const res = await updateMovie(movie.id, data);
      router.push("/movies/" + res.id);
    },
  };

  useEffect(() => {
    if (gLoading) return;
    MovieFormOptions.fields.push({
      label: "Genres",
      name: "genres",
      type: "select",
      input: "select",
      select: {
        multiple: true,
        data: genres,
        getName: (g) => g.name,
        getValue: (g) => g.id.toString(),
      },
      onChange: (e) => {
        return e;
      },
    });
  }, [gLoading]);

  if (gLoading || loading) return <Loading />;
  if (Window !== undefined && loading === false && !movie)
    return <NotFound></NotFound>;

  MovieFormOptions.fields = MovieFormOptions.fields.map((f) => {
    if (f.name === "picture") {
      f.defaultValue = movie?.picture;
      f.required = false;
    }

    return f;
  });

  return (
    <div>
      <FormContainer {...MovieFormOptions} button={{ text: "Save Changes" }} />
    </div>
  );
}

export default EditMovie;
