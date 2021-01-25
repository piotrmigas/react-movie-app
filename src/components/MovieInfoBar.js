import React from "react";
import styled from "styled-components";
import { calcTime, convertMoney } from "../helpers";

const MovieInfoBar = ({ time, budget, revenue }) => {
  return (
    <StyledMovieInfoBar>
      <div className="movieinfobar-content">
        <div className="movieinfobar-content-col">
          <i className="far fa-clock fa-2x"></i>
          <span className="movieinfobar-info">Running time: {calcTime(time)}</span>
        </div>

        <div className="movieinfobar-content-col">
          <i className="far fa-money-bill-alt fa-2x"></i>
          <span className="movieinfobar-info">Budget: {convertMoney(budget)}</span>
        </div>

        <div className="movieinfobar-content-col">
          <i className="fas fa-money-check-alt fa-2x"></i>
          <span className="movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
        </div>
      </div>
    </StyledMovieInfoBar>
  );
};

const StyledMovieInfoBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100px;
  height: auto;
  background: #1c1c1c;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Abel", sans-serif;
  font-size: 20px;

  .movieinfobar-content {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    color: #fff;
  }

  .movieinfobar-content-col {
    float: left;
    width: 33.33%;
    box-sizing: border-box;
    padding: 10px 20px 0 0;
  }

  .movieinfobar-info {
    padding: 5px 0 0 10px;
    float: left;
  }

  .fa-clock,
  .fa-money-check-alt {
    float: left;
    margin-top: -4px;
  }

  .fa-money-bill-alt {
    float: left;
    margin-top: -3px;
  }

  @media screen and (max-width: 768px) {
    .fa-clock,
    .fa-money-check-alt,
    .fa-money-bill-alt {
      display: none;
    }
  }

  @media screen and (max-width: 425px) {
    font-size: 14px;
  }
`;

export default MovieInfoBar;
