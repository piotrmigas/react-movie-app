import React from "react";
import { API_KEY, API_URL } from "../config";
import styled from "styled-components";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import NoImage from "../images/no_image.jpg";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";

const Bio = ({ match: { params: actorId } }) => {
  const [actor, setActor] = React.useState({});
  const [error, setError] = React.useState(false);

  const history = useHistory();

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  React.useEffect(() => {
    setError(false);
    try {
      fetch(`${API_URL}person/${actorId.actorId}?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => setActor(data));
    } catch (error) {
      setError(true);
    }
  }, [actorId]);

  if (error) return <div>Something went wrong...</div>;
  if (!actor.profile_path) return <Spinner />;

  return (
    <>
      <StyledNavigation>
        <div className="navigation-content">
          <p onClick={back} className="back">
            Back
          </p>
          <p>|</p>
          <p>{actor.name}</p>
        </div>
      </StyledNavigation>
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
    border-radius: 20px;

    :hover {
      opacity: 0.8;
    }

    .clickable {
      cursor: pointer;
    }
  }
`;

const StyledNavigation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #353535;
  color: #fff;

  .navigation-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;

    p {
      font-family: "Abel", sans-serif;
      font-size: 22px;
      float: left;
      color: #fff;
      padding-right: 10px;
      text-decoration: none;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }

    .back {
      cursor: pointer;
    }
  }
`;

export default Bio;
