import React from "react";
import styled from "styled-components";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = React.useState("");
  const initial = React.useRef(null);

  React.useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <i className="fas fa-search fa-2x"></i>
        <input type="text" placeholder="Search Movie" onChange={(e) => setState(e.currentTarget.value)} value={state} />
      </StyledSearchBarContent>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  width: 100%;
  height: 105px;
  background: #1c1c1c;
  padding: 25px 20px 0px 20px;
  box-sizing: border-box;
  color: #fff;
`;

const StyledSearchBarContent = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 55px;
  background: #353535;
  margin: 0 auto;
  border-radius: 40px;
  position: relative;
  color: #fff;

  .fa-search {
    position: absolute;
    left: 20px;
    top: 12px;
    color: #fff;
    z-index: 1000;
  }

  input {
    font-family: "Abel", sans-serif;
    font-size: 28px;
    position: absolute;
    left: 0px;
    margin: 8px 0;
    padding: 0 0 0 60px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 40px;
    color: #fff;
    box-sizing: border-box;

    :focus {
      outline: none;
    }

    @media screen and (max-width: 720px) {
      font-size: 28px;
    }
  }
`;

export default SearchBar;
