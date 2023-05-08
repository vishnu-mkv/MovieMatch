import { GenreSummary } from "@/interfaces/movie";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

function GenreBox({
  genre,
  showActions = false,
}: {
  showActions?: boolean;
  genre: GenreSummary;
}) {
  return (
    <div className="container is-widescreen card">
      <div className="card-image">
        <figure className="image is-1by1">
          <Image
            src={genre.photo}
            alt=""
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">
          <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
        </p>
      </div>
      {showActions && (
        <div className="card-footer buttons p-2 are-small is-right">
          <Button
            text="Edit"
            color="is-info is-light"
            href={`/genres/${genre.id}/edit`}
          >
            Edit
          </Button>
          <Button
            text="Delete"
            color="is-danger is-light"
            href={`/genres/${genre.id}/delete`}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default GenreBox;
