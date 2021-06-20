import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import NoImage from "../images/no_image.jpg";
import Spinner from "../components/Spinner";
import API, { Actor } from "../API";
import BreadCrumb from "../components/BreadCrumb";

type ParamTypes = {
  actorId: string;
};

const Bio: React.FC = () => {
  const [actor, setActor] = React.useState<Actor>({} as Actor);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { actorId } = useParams<ParamTypes>();

  React.useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        setError(false);
        setActor(await API.fetchActor(actorId));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchActor();
  }, [actorId]);

  if (error) return <div>Something went wrong...</div>;
  if (loading) return <Spinner />;

  return (
    <>
      <BreadCrumb actorName={actor.name} />
      <StyledBio>
        <div className="actorinfo-content">
          <div className="thumb">
            <StyledThumb>
              <img src={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage} alt="" />
            </StyledThumb>
          </div>
          <div className="bio">
            <h1>{actor.name}</h1>
            {actor.biography ? (
              <>
                <h3>BIO</h3>
                <p>{actor.biography}</p>
              </>
            ) : (
              <p>No bio available.</p>
            )}
          </div>
        </div>
      </StyledBio>
    </>
  );
};

const StyledBio = styled.div`
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
  animation: animateMovieinfo 1s;

  .actorinfo-content {
    max-width: 1280px;
    min-height: 450px;
    margin: 0 auto;
    background: #1c1c1c;
    border-radius: 20px;
    position: relative;
  }

  .thumb {
    width: 300px;
    float: left;

    @media screen and (max-width: 768px) {
      width: 100% !important;
    }
  }

  .bio {
    font-family: Arial, Helvetica, sans-serif;
    padding: 40px;
    color: #fff;
    overflow: hidden;

    h1 {
      font-family: "Abel", sans-serif;
      font-size: 48px;
      margin: 0;

      @media screen and (max-width: 1000px) {
        font-size: 32px !important;
      }
    }

    h3 {
      font-size: 16px;
      line-height: 0;
      margin-top: 30px;
    }

    p {
      font-family: "Abel", sans-serif;
      font-size: 18px;
      line-height: 26px;
    }
  }

  @media screen and (max-width: 768px) {
    min-height: 600px;
    height: auto;
  }

  @keyframes animateMovieinfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledThumb = styled.div`
  img {
    width: 100%;
    height: auto;
    transition: all 0.3s;
    object-fit: cover;
    border-top-left-radius: 20px;

    :hover {
      opacity: 0.8;
    }

    .clickable {
      cursor: pointer;
    }
  }
`;

export default Bio;
