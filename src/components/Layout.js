import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <div>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      ></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
