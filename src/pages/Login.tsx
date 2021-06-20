import React from "react";
import { useHistory } from "react-router-dom";
import API from "../API";
import Button from "../components/Button";
import { Context } from "../context";
import styled from "styled-components";

const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const [_user, setUser] = React.useContext(Context);
  const history = useHistory();

  const handleSubmit = async () => {
    setError(false);
    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.authenticate(requestToken, username, password);
      setUser({ sessionId: sessionId.session_id, username });
      history.goBack();
    } catch (error) {
      setError(true);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <Wrapper>
      {error && <div className="error">There was an error!</div>}
      <label>Username:</label>
      <input type="text" value={username} name="username" onChange={handleInput} />
      <input type="password" value={password} name="password" onChange={handleInput} />
      <Button text="Login" callback={handleSubmit} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 320px;
  padding: 20px;
  color: var(--darkGrey);
  input {
    width: 100%;
    height: 30px;
    border: 1px solid var(--darkGrey);
    border-radius: 20px;
    margin: 10px 0;
    padding: 10px;
    outline: none;
  }
  .error {
    color: red;
  }
`;

export default Login;
