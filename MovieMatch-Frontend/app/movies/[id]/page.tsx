import Tag, { LinkTags, Tags } from "@/components/Tag";
import { dateOptions } from "@/constants";
import { getMovieById } from "@/services/movies";
import Image from "next/image";
import React from "react";
import Comment from "./Comment";

export interface pageProps {
  params: {
    id: string;
  };
}

async function page({ params: { id } }: pageProps) {
  const movie = await getMovieById(id);
  return (
    <div>
      <div className="movie-top  my-3 is-flex has-background-primary-light">
        <div className="container column is-4 image is3by4">
          <Image
            src={movie.picture}
            priority
            alt=""
            width={200}
            height={100}
          ></Image>
          <small className="is-size-7 has-text-grey-light">
            uploaded by - {movie.user.firstName + " " + movie.user.lastName}
          </small>
        </div>
        <div className="column is-8 mt-6">
          <LinkTags
            data={movie.genres}
            getLink={(g) => "/genres/" + g.id}
            getText={(g) => g.name}
            color="is-warning"
          ></LinkTags>
          <h1 className="title is-size-3">{movie.title}</h1>
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
                text: movie.releasedOn.toLocaleDateString("en-US", dateOptions),
                icon: "calendar_month",
              },
            ]}
            color="is-warning is-light"
            size="is-size-6"
            group={true}
          ></Tags>
          <div className="info">
            <p className="has-text-grey">{movie.description}</p>
            <br />
            <p>Directed by - {movie.director}</p> <br />
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="is-size-5 has-text-weight-medium mt-6 mb-4">Comments</h2>
        <div className="columns is-multiline">
          {movie.reviews.map((review) => {
            return (
              <div className="my-column is-4">
                <div
                  key={review.id}
                  className="p-4 has-background-white-bis has-text-white wh-100"
                >
                  <div className="columns mb-0">
                    <div className="my-column">
                      <Tag
                        text={review.rating}
                        icon="star"
                        color="is-primary"
                        size="is-size-7"
                      ></Tag>
                    </div>
                    <div className="my-column">
                      <h3 className="has-text-weight-medium has-text-info">
                        {review.user.firstName + " " + review.user.lastName}
                      </h3>
                    </div>
                  </div>
                  <p className="has-text-dark">{review.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Comment movie={movie}></Comment>
    </div>
  );
}

export default page;
