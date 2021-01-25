import React from "react";
import Navigation from "../components/Navigation";
import MovieInfo from "../components/MovieInfo";
import MovieInfoBar from "../components/MovieInfoBar";
import Grid from "../components/Grid";
import Actor from "../components/Actor";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL } from "../config";
import { useQuery } from "react-query";

const Movie = () => {
  const fetchMovie = async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  };

  const fetchCredits = async (movieId) => {
    const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    return await (await fetch(creditsEndpoint)).json();
  };

  const getMovie = async (movieId) => {
    const movie = await fetchMovie(movieId);
    const credits = await fetchCredits(movieId);
    const directors = credits.crew.filter((member) => member.job === "Director");
    return {
      ...movie,
      actors: credits.cast,
      directors,
    };
  };

  const { movieId } = useParams();

  const { data: movie, isLoading, isError } = useQuery(movieId, () => getMovie(movieId));

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Navigation movie={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor key={actor.credit_id} actor={actor} movieId={movie.id} />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
