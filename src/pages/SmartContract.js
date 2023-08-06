import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import "./SmartContract.css";
import Header from "../components/Header";
import Card from "../components/Card";
import web3 from "../components/web3";
const generateFuncs = (abi) => {
  const fun = [];
  abi.forEach((el) => {
    if (el.type == "function") {
      fun.push({
        name: el.name,
        inputs: el.inputs.map((i) => i.name),
        stateMutability: el.stateMutability,
      });
    }
  });
  return fun;
};

const SmartContract = () => {
  const [etherValue, setEtherValue] = useState();
  const [balance, setBalance] = useState();

  const {
    user,
    curAddr,
    setLoading,
    abi,
    setAbi,
    address,
    setAddress,
    fun,
    setFun,
  } = useContext(MyContext);

  useEffect((e) => {
    (async function () {
      setBalance((await web3.eth.getBalance(curAddr)) || "0");
    })();
  });

  const getContractHandler = async () => {
    try {
      setFun(generateFuncs(JSON.parse(abi)));
    } catch (e) {
      alert("Failed to fetch Smart Contract!");
    }
  };

  const clickHandler = async (e, f) => {
    setLoading(true);
    let response2;
    const fName = f.name;
    const inputAbiObject = JSON.parse(abi).find((el) => el.name == fName);
    const inputs = f.inputs.map(
      (i) => document.getElementById(f.name + "." + i).value
    );

    const url = `${process.env.REACT_APP_URL}/fun`;
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName,
          inputs,
          contractAddress: address,
          abi: JSON.parse(abi),
          token: user.token,
          etherValue,
          stateMutability: f.stateMutability,
          from: curAddr,
          inputAbiObject,
        }),
      });
      response2 = await response.json();
    } catch (e) {
      setLoading(false);
      return setTimeout(function () {
        alert("Transaction failed!");
      }, 12);
    }
    setLoading(false);
    setTimeout(function () {
      if (response2.blockNumber > 3602550) alert("Success!");
      else {
        if (typeof response2 == "object") {
          alert(JSON.stringify(response2));
        } else {
          alert(response2);
        }
      }
    }, 12);
  };
  return (
    <>
      <Header></Header>
      <div className="smart-contract-parent">
        <Card className="accounts">
          <h2>Current Account</h2>
          <div className="accounts-entry highlight">
            <h3>{curAddr}</h3>
          </div>
          <h4>Balance: {balance} wei</h4>
        </Card>
        <p className="dialogue">
          Enter abi and address of smart contract deployed to sepolia testnet to
          interact with it.
        </p>
        <div className="gen-smart">
          <input
            onChange={(e) => setAbi(e.target.value)}
            placeholder="abi"
          ></input>
          <input
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
          ></input>
          <button className="outline-button" onClick={getContractHandler}>
            Get Smart Contract
          </button>
        </div>

        {fun && (
          <div className="contract-interface">
            <h2>Smart Contract Interface:</h2>
            <div className="contract">
              {fun?.map((f) => (
                <div key={f.name}>
                  <button id={f.name} onClick={(e) => clickHandler(e, f)}>
                    {f.name}
                  </button>
                  {f.inputs.map((i) => (
                    <input
                      key={f.name + "." + i}
                      id={f.name + "." + i}
                      placeholder={i}
                    ></input>
                  ))}
                  {f.stateMutability == "payable" && (
                    <input
                      onChange={(e) => {
                        setEtherValue(e.target.value);
                      }}
                      placeholder="Ether Value"
                    ></input>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SmartContract;

// 0x700771a05dA385a564Fa7Bbd4dC68A2416e3fe7F
