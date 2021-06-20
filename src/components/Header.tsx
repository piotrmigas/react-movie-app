import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RMDBLogo from "../images/reactMovie_logo.png";
import TMDBLogo from "../images/tmdb_logo.png";
import { Context } from "../context";

const Header: React.FC = () => {
  const [user, setUser] = React.useContext(Context);

  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="rmdb-logo" />
        </Link>
        {user ? (
          <>
            <span>Logged in as: {user.username}</span>
            <span onClick={() => setUser(null)} style={{ cursor: "pointer" }}>
              Logout
            </span>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
        <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;
  color: var(--white);

  a {
    color: var(--white);
  }
`;

const LogoImg = styled.img`
  width: 200px;

  @media screen and (max-width: 500px) {
    width: 150px;
  }
`;

const TMDBLogoImg = styled.img`
  width: 100px;

  @media screen and (max-width: 500px) {
    width: 80px;
  }
`;

export default Header;
