import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
const RegisterPage = () => {
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [pass2, setPass2] = useState();
  const navigate = useNavigate();
  const { setLoading } = useContext(MyContext);

  const registerHandler = async () => {
    if (pass !== pass2) return alert("Passwords do not match!");
    if (pass.length < 6)
      return alert("Password should be longer than 6 characters!");

    setLoading(true);
    const url = `${process.env.REACT_APP_URL}/register`;
    try {
      await fetch(url, {
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
    } catch (e) {
      setLoading(false);
      return setTimeout(function () {
        alert("Registration failed!");
      }, 10);
    }
    setLoading(false);
    navigate("/login");
    setTimeout(function () {
      alert("Login now to continue.");
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
        <input
          type="password"
          onChange={(e) => {
            setPass2(e.target.value);
          }}
          placeholder="Re-enter Password"
        ></input>
        <button onClick={registerHandler}>Register</button>
      </div>
      <Link to="/login">
        <p className="link">Already have an account, Login now!</p>
      </Link>
    </div>
  );
};

export default RegisterPage;
