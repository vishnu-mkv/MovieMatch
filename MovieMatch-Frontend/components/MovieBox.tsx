import { MovieSummary } from "@/interfaces/movie";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LinkTags, Tags } from "./Tag";
import Button from "./Button";

function MovieBox({
  movie,
  showActions = false,
}: {
  movie: MovieSummary;
  showActions?: boolean;
}) {
  return (
    <div className="container is-widescreen card">
      <div className="card-image">
        <figure className="image is-1by1">
          <Image
            src={movie.picture}
            alt=""
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </figure>
      </div>
      <div className="card-content">
        <Tags
          tags={[
            {
              text: movie.rating.toFixed(1),
              icon: "star",
            },
            {
              text: movie.watchCount,
              icon: "visibility",
            },
            {
              text: movie.releasedOn.getFullYear(),
              icon: "calendar_month",
            },
          ]}
          color="is-success is-light"
          size=""
          group={true}
        ></Tags>
        <div className="">
          {/* <div className="media-content"> */}
          <p className="title is-4">
            <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
          </p>
          <LinkTags
            data={movie.genres}
            getLink={(g) => "/genres/" + g.id}
            getText={(g) => g.name}
            color="is-warning"
          ></LinkTags>

          {/* </div> */}
        </div>
        {/* <div className="content">
            {movie.description.slice(0, descriptionSize)}
            {movie.description.length > descriptionSize && "..."}
          </div> */}
      </div>
      {showActions && (
        <div className="card-footer buttons p-2 are-small is-right">
          <Button
            text="Edit"
            color="is-info is-light"
            href={`/movies/${movie.id}/edit`}
          >
            Edit
          </Button>
          <Button
            text="Delete"
            color="is-danger is-light"
            href={`/movies/${movie.id}/delete`}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default MovieBox;
