import { MovieSection, MovieSummary } from "@/interfaces/movie";
import React from "react";
import MovieBox from "./MovieBox";
import Title, { TitleProps } from "./Title";

function MovieContainer({
  title,
  movies,
  showActions,
}: {
  title: TitleProps;
  movies: MovieSummary[];
  showActions?: boolean;
}) {
  return (
    <div className="mb-7">
      {title && <Title {...title} />}
      <div className="columns is-multiline">
        {movies.map((movie) => (
          <div
            className="column is-flex is-6-tablet is-4-desktop"
            key={`${title}--movie--${movie.id}`}
          >
            <MovieBox showActions={showActions} movie={movie}></MovieBox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieContainer;
