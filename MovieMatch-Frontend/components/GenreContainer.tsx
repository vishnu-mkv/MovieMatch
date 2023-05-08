import React from "react";
import { GenreSummary } from "@/interfaces/movie";
import GenreBox from "./GenreBox";
import Title, { TitleProps } from "./Title";

function GenreContainer({
  title,
  genres,
  showActions,
}: {
  genres: GenreSummary[];
  title: TitleProps;
  showActions?: boolean;
}) {
  return (
    <div className="mb-7">
      <Title {...title}></Title>
      <div className="columns is-multiline">
        {genres.map((genre) => (
          <div
            className="column is-flex is-6-tablet is-4-desktop"
            key={`${title}--genre--${genre.id}`}
          >
            <GenreBox showActions={showActions} genre={genre}></GenreBox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreContainer;
