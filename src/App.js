import "./App.css";
import { Route, Routes } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { MyContext } from "./MyContext";
import { useState } from "react";
import SmartContract from "./pages/SmartContract";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [user, setUser] = useState();
  const [addresses, setAddresses] = useState();
  const [curAddr, setCurAddr] = useState();
  const [loading, setLoading] = useState(false);
  const [abi, setAbi] = useState();
  const [address, setAddress] = useState();
  const [fun, setFun] = useState();

  return (
    <MyContext.Provider
      value={{  
        user,
        setUser,
        addresses,
        setAddresses,
        curAddr,
        setCurAddr,
        loading,
        setLoading,
        abi,
        setAbi,
        address,
        setAddress,
        fun,
        setFun,
      }}
    >
      <LoadingSpinner>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/smart" element={<SmartContract />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/*" element={<LoginPage />} />
        </Routes>
      </LoadingSpinner>
    </MyContext.Provider>
  );
}

export default App;
