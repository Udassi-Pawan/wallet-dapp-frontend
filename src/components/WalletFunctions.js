import { useContext, useState, CSSProperties } from "react";
import { MyContext } from "../MyContext";
import Card from "../components/Card";
import "./WalletFunctions.css";

const WalletFunctions = () => {
  const [pk, setPk] = useState();
  const [to, setTo] = useState();
  const [amount, setAmount] = useState();
  const { user, addresses, setAddresses, setCurAddr, setLoading, curAddr } =
    useContext(MyContext);

  const createHandler = async (e) => {
    setLoading(true);
    let result;
    const url = `${process.env.REACT_APP_URL}/newacc`;
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privateKey: e.target.id == "recover" ? pk : null,
          userId: user._id,
        }),
      });
      result = await response.json();
    } catch (e) {
      setLoading(false);
      setTimeout(function () {
        return alert("Unable to add Account.");
      }, 10);
    }
    setLoading(false);
    setAddresses(result?.accounts);
    setCurAddr(result?.accounts[result.accounts.length - 1].address);
  };
  const sendHandler = async () => {
    setLoading(true);
    let result;
    const url = `${process.env.REACT_APP_URL}/sendeth`;
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: curAddr,
          to,
          token: user.token,
          amount,
        }),
      });
      result = await response.json();
    } catch (e) {
      setLoading(false);
      setTimeout(function () {
        return alert("Transaction failed!");
      }, 10);
    }
    setLoading(false);

    setAddresses(result?.accounts);
  };
  return (
    <Card className="card wallet">
      <button className="create outline-button" onClick={createHandler}>
        Create New Account
      </button>
      <div className="wallet-inputs">
        <input
          onChange={(e) => setPk(e.target.value)}
          placeholder="Private Key"
          className="addr"
        ></input>
        <button id="recover" onClick={createHandler}>
          Add account
        </button>
      </div>

      <div className="wallet-inputs">
        <input
          onChange={(e) => {
            setTo(e.target.value);
          }}
          placeholder="to"
          className="addr"
        ></input>
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder="amount in wei"
        ></input>
        <button id="send" onClick={sendHandler}>
          Send Ether
        </button>
      </div>
    </Card>
  );
};

export default WalletFunctions;
