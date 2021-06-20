import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Movie } from "../API";

type Props = {
  movie?: Movie;
  actorName?: string;
};

const BreadCrumb: React.FC<Props> = ({ movie, actorName }) => {
  const history = useHistory();

  return (
    <Wrapper>
      <Content>
        <span onClick={() => history.goBack()}>Back</span>
        <span>|</span>
        <span>{movie?.original_title ? movie?.original_title : actorName}</span>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background: var(--medGrey);
  color: var(--white);
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--maxWidth);
  padding: 0 20px;

  span {
    font-size: var(--fontMed);
    color: var(--white);
    padding-right: 10px;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      font-size: var(--fontSmall);
    }
  }
`;

export default BreadCrumb;
