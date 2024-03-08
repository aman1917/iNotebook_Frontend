import React,{useEffect} from "react";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });
  const { showAlert } = props;
  return (
    <>
      <div className="container my-3">
        <Notes showAlert={showAlert} />
      </div>
    </>
  );
};

export default Home;
