import { useContext, useState, CSSProperties } from "react";
import { MyContext } from "../MyContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import WalletFunctions from "../components/WalletFunctions";
import "./Homepage.css";
import Card from "../components/Card";
import History from "../components/History";
import Accounts from "../components/Accounts";

const HomePage = () => {
  const { user, addresses, setAddresses, loading, setLoading } =
    useContext(MyContext);
  return (
    <div className="homepage-parent">
      <Header></Header>
      <div className="mid">
        <WalletFunctions></WalletFunctions>
        <Accounts></Accounts>
      </div>
      <History></History>
    </div>
  );
};
export default HomePage;
