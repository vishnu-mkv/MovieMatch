import { FormProps } from "@/components/Form";
import { User } from "@/constants";

export interface MovieSummary {
  id: number;
  title: string;
  releasedOn: Date;
  director: string;
  description: string;
  status: string;
  genres: GenreSummary[];
  picture: string;
  watchCount: number;
  rating: number;
}

export interface GenreSummary {
  id: number;
  name: string;
  photo: string;
}

export interface Genre extends GenreSummary {
  movies: MovieSummary[];
}

export interface MovieSection {
  title: string;
  movies: MovieSummary[];
}

export interface Review {
  id: number;
  comment: string;
  rating: number;
  user: User;
}

export interface Movie extends MovieSummary {
  user: User;
  reviews: Review[];
}

export type DashboardData = MovieSection[];

export interface MovieFormData
  extends Omit<
    MovieSummary,
    "genres" | "picture" | "user" | "id" | "rating" | "watchCount" | "status"
  > {
  genres: number[];
  picture: File | undefined;
}

export const movieForm: FormProps<MovieFormData, GenreSummary> = {
  button: {
    text: "Create",
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
    },
    {
      label: "Director",
      name: "director",
      type: "text",
    },
    {
      label: "Description",
      input: "textarea",
      name: "description",
      type: "text",
    },
    {
      label: "Released On",
      name: "releasedOn",
      type: "date",
      onChange: (e) => {
        return new Date(e.target.value);
      },
    },
    {
      label: "Picture",
      name: "picture",
      type: "file",
      inputProps: {
        accept: "image/*",
      },
      messages: [
        {
          message: "Only image files are allowed",
          match: "typeMismatch",
        },
      ],
      onChange: (e) => {
        return e.target.files[0];
      },
    },
  ],
};
