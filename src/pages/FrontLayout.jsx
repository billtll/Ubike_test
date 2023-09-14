import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const FrontLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/stations-info");
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default FrontLayout;
