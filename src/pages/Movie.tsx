import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Grid from "../components/Grid";
import Spinner from "../components/Spinner";
import MovieInfo from "../components/MovieInfo";
import MovieInfoBar from "../components/MovieInfoBar";
import Actor from "../components/Actor";
import { useMovieFetch } from "../hooks/useMovieFetch";

type ParamTypes = {
  movieId: string;
};

const Movie: React.FC = () => {
  const { movieId } = useParams<ParamTypes>();

  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <BreadCrumb movie={movie} />
      <MovieInfo movie={movie} />
      <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor movieId={movieId} key={actor.id} actor={actor} />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
