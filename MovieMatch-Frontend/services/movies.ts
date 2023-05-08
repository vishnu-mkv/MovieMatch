import {
  DashboardData,
  Genre,
  GenreSummary,
  Movie,
  MovieSummary,
  Review,
} from "@/interfaces/movie";
import { _delete, get, post, put } from "@/utils/api_helpers";

export const getDashboardData = async (): Promise<DashboardData> => {
  return get("/dashboard");
};

export const getMovies = async (): Promise<MovieSummary[]> => {
  return get("/movies");
};

export const getGenres = async (): Promise<GenreSummary[]> => {
  return get("/genres");
};

export const getGenreById = async (id: string | number): Promise<Genre> => {
  return get(`/genres/${id}`);
};

export const getMovieById = async (id: string | number): Promise<Movie> => {
  return get(`/movies/${id}`);
};

export const getMyMovies = async (): Promise<MovieSummary[]> => {
  return get("/movies/my-movies", true);
};

export const postReview = async (data: {
  comment: string;
  rating: number;
  movieId: number;
}): Promise<Review> => {
  return post("/ratings", data, true);
};

export const postMovie = async (data: any): Promise<Movie> => {
  return post("/movies", data, true, true);
};

export const deleteMovie = async (
  id: string | number
): Promise<MovieSummary> => {
  return _delete("/movies/" + id, true);
};

export const deleteGenre = async (
  id: string | number
): Promise<GenreSummary> => {
  return _delete("/genres/" + id, true);
};

export const updateMovie = async (
  id: string | number,
  data: any
): Promise<Movie> => {
  return put("/movies/" + id, data, true, true);
};

export const addGenre = async (data: any): Promise<Movie> => {
  return post("/genres/", data, true, true);
};

export const updateGenre = async (
  id: string | number,
  data: any
): Promise<Movie> => {
  return put("/genres/" + id, data, true, true);
};
