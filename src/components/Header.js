import { useContext } from "react";
import "./Header.css";
import { MyContext } from "../MyContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const {
    user,
    setUser,
    setAddresses,
    setCurAddr,
    setAbi,
    setAddress,
    setFun,
  } = useContext(MyContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    setUser();
    setAddresses();
    setAddress();
    setCurAddr();
    setAbi();
    setFun();
    navigate("/login");
  };
  return (
    <div className="header-parent">
      <h1 id="brand">CrypWallet</h1>
      <div className="right">
        <Link to="/home" style={{ textDecoration: "inherit" }}>
          <h2>Home</h2>
        </Link>
        <Link to="/smart" style={{ textDecoration: "inherit" }}>
          <h2>Smart Contract</h2>
        </Link>
        <div className="cur-user">
          <h2 id="username">{user.username}</h2>
          <button className="outline-button" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
