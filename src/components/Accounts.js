import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import "./Accounts.css";
import Card from "./Card";
import web3 from "./web3";

const Accounts = () => {
  const { curAddr, setCurAddr, user, addresses, setAddresses } =
    useContext(MyContext);
  const [balance, setBalance] = useState();
  const clickHandler = async (e) => {
    setCurAddr(e.target.textContent);
    setBalance((await web3.eth.getBalance(e.target.textContent)) || "0");
  };

  useEffect((e) => {
    (async function () {
      setBalance((await web3.eth.getBalance(curAddr)) || "0");
    })();
  });

  return (
    <Card className="accounts">
      <h2>Wallet Accounts</h2>
      {addresses &&
        addresses.map((addr) => (
          <div
            key={addr.address}
            className={
              addr.address == curAddr
                ? "accounts-entry highlight"
                : "accounts-entry"
            }
          >
            <h3 onClick={clickHandler} key={addr._id}>
              {addr.address}
            </h3>
          </div>
        ))}
      <h4>Balance: {balance} wei</h4>
    </Card>
  );
};

export default Accounts;
