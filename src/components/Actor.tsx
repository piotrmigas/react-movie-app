import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NoImage from "../images/no_image.jpg";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

type Props = {
  actor: {
    name: string;
    character: string;
    id: string;
    profile_path?: string;
  };
  movieId: string;
};

const Actor: React.FC<Props> = ({ actor, movieId }) => {
  return (
    <Link to={`/${movieId}/${actor.id}`}>
      <Wrapper>
        <Image
          src={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage}
          alt="actor-thumb"
        />
        <h3>{actor.name}</h3>
        <p>{actor.character}</p>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div`
  color: var(--white);
  background: var(--darkGrey);
  border-radius: 20px;
  padding: 5px;
  text-align: center;

  h3 {
    margin: 10px 0 0 0;
  }

  p {
    margin: 5px 0;
  }

  a {
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
`;

export default Actor;
