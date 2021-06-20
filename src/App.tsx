import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Bio from "./pages/Bio";
import { GlobalStyle } from "./GlobalStyle";
import Login from "./pages/Login";
import UserProvider from "./context";

const App: React.FC = () => (
  <BrowserRouter>
    <UserProvider>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:movieId" component={Movie} />
        <Route exact path="/:movieId/:actorId" component={Bio} />
      </Switch>
      <GlobalStyle />
    </UserProvider>
  </BrowserRouter>
);

export default App;
