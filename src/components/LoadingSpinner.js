import { useContext, CSSProperties } from "react";
import { DotLoader } from "react-spinners";
import { MyContext } from "../MyContext";

const override: CSSProperties = {
  position: "absolute",
  left: "45%",
  top: "40%",
};

const LoadingSpinner = ({ children }) => {
  const { loading } = useContext(MyContext);
  return (
    <>
      {loading ? (
        <DotLoader color={"lightgreen"} cssOverride={override} size={70} />
      ) : (
        <> {children} </>
      )}
    </>
  );
};

export default LoadingSpinner;
