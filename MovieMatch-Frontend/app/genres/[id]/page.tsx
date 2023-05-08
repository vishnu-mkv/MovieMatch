import MovieContainer from "@/components/MovieContainer";
import { getGenreById } from "@/services/movies";
import React from "react";

async function GenreDetail({ params: { id } }: { params: { id: string } }) {
  const genre = await getGenreById(id);
  return (
    <div>
      <section
        className="hero is-medium is-primary mb-5"
        style={{
          backgroundImage: `url(${genre.photo})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-body">
          <p className="title is-size-1">{genre.name}</p>
        </div>
      </section>
      <MovieContainer
        title={{ title: "Movies in " + genre.name }}
        movies={genre.movies}
      ></MovieContainer>
    </div>
  );
}

export default GenreDetail;
