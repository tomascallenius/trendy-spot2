import Home from "../../views/home/home";
import "./styles.css";
import Nav from "../nav/nav";

export const ContextUser = () => {
  return (
    <>
      <div className="containerDiv">
        <Nav />
        <Home />
      </div>
    </>
  );
};
