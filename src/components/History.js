import "./History.css";
import Card from "./Card";
import { MyContext } from "../MyContext";
import { useContext } from "react";

const History = () => {
  const { user, addresses, setAddresses } = useContext(MyContext);

  return (
    <Card className="history">
      <h2>Transaction History</h2>
      {addresses &&
        addresses.map((address) =>
          address.history?.map((tx, ind) => (
            <div key={tx._id} className="history-entry">
              <h3>{ind}</h3>
              <div>
                <p>
                  <b>from: </b>
                  {tx.from}
                </p>
                <p>
                  <b>to: </b>
                  {tx.to}
                </p>
                <p>
                  <b>value:</b> {tx.value}{" "}
                </p>
                <p>
                  <b>time:</b> {tx.time}
                </p>
                {ind < address.history.length - 1 && (
                  <div className="line"></div>
                )}
              </div>
            </div>
          ))
        )}
    </Card>
  );
};

export default History;
