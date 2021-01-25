import React from "react";
import HeroImage from "../components/HeroImage";
import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";
import MovieThumb from "../components/MovieThumb";
import LoadMoreBtn from "../components/LoadMoreBtn";
import Spinner from "../components/Spinner";
import { POPULAR_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, IMAGE_BASE_URL, SEARCH_BASE_URL } from "../config";
import NoImage from "../images/no_image.jpg";
import { useInfiniteQuery } from "react-query";

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchMovies = async (searchTerm, page) => {
    const endpoint = searchTerm ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}` : `${POPULAR_BASE_URL}&page=${page}`;
    return await (await fetch(endpoint)).json();
  };

  const { data, isFetching, isError, hasNextPage, fetchNextPage } = useInfiniteQuery(
    `movies-${searchTerm}`,
    (_key, page) => fetchMovies(searchTerm, page),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page === lastPage.total_pages) return undefined;
        return lastPage.page + 1;
      },
    }
  );

  if (isError) return <div>Something went wrong...</div>;

  return (
    <>
      {!searchTerm && !isFetching ? (
        <HeroImage
          title={data.pages[0].results[0].original_title}
          text={data.pages[0].results[0].overview}
          image={IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0].backdrop_path}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {data &&
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.results.map((movie) => (
                <MovieThumb
                  clickable
                  image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
                  key={movie.id}
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              ))}
            </React.Fragment>
          ))}
      </Grid>
      {isFetching && <Spinner />}
      {hasNextPage && !isFetching && <LoadMoreBtn text="Load More" callback={() => fetchNextPage()} />}
    </>
  );
};

export default Home;
