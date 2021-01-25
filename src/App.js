import React from "react";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bio from "./pages/Bio";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:movieId" component={Movie} />
          <Route exact path="/:movieId/:actorId" component={Bio} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default App;
