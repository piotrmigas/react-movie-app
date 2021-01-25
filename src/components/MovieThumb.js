import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MovieThumb = ({ image, movieId, clickable }) => {
  return (
    <StyledMovieThumb>
      {clickable ? (
        <Link to={`/${movieId}`}>
          <img src={image} className="clickable" alt="" />
        </Link>
      ) : (
        <img src={image} alt="" />
      )}
    </StyledMovieThumb>
  );
};

const StyledMovieThumb = styled.div`
  img {
    width: 100%;
    height: auto;
    transition: all 0.3s;
    object-fit: cover;
    border-radius: 20px;

    :hover {
      opacity: 0.8;
    }

    .clickable {
      cursor: pointer;
    }
  }
`;

export default MovieThumb;
