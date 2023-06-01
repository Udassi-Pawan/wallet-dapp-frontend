import { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const { setUser, setAddresses, curAddr, setCurAddr, setLoading } =
    useContext(MyContext);
  const navigate = useNavigate();

  const loginHandler = async () => {
    setLoading(true);
    const url = process.env.REACT_APP_URL;
    console.log(url);
    let response2;
    try {
      const response1 = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pass,
        }),
      });
      response2 = await response1.json();
    } catch (e) {
      setLoading(false);
      return setTimeout(function () {
        alert("Login failed!");
      }, 10);
    }
    setLoading(false);
    if (response2.username) {
      const { _id, username, token, addresses } = response2;
      console.log(response2);
      setUser({ _id, username, token });
      setAddresses(addresses);
      setCurAddr(addresses[0]?.address);
      navigate("/home");
    } else
      setTimeout(function () {
        alert("Login failed!");
      }, 10);
  };

  return (
    <div className="log-register">
      <h1>Crypwallet</h1>
      <div className="form">
        <input
          type="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        ></input>
        <input
          type="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          placeholder="Password"
        ></input>
        <button onClick={loginHandler}>Login</button>
      </div>
      <Link to="/register">
        <p className="link">Don't have an account yet?, Register now!</p>
      </Link>
    </div>
  );
};

export default LoginPage;
