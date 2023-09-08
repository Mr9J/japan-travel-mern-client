import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = ({ currentUser, setCurrentUser }) => {
  const logoutHandler = () => {
    AuthService.logout();
    window.alert("登出成功");
    setCurrentUser(null);
  };

  return (
    <div className="Header">
      <div className="Background-fixed">
        <div className="wrap"></div>
        <img
          src="images/Background.jpg"
          className="fixed-background"
          alt="fixed-background"
        ></img>
      </div>
      <Navbar
        expand="lg fixed-top"
        style={{
          backgroundColor: "rgb(159, 45, 32)",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            style={{ color: "white", fontSize: "26px" }}
            to="/"
          >
            日本旅遊行程
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "white" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="custom-nav">
                <i className="fa-solid fa-house"></i>
                首頁
              </Nav.Link>
              {!currentUser && (
                <Nav.Link as={Link} to="/register" className="custom-nav">
                  <i className="fa-solid fa-plane"></i>會員註冊
                </Nav.Link>
              )}
              {!currentUser && (
                <Nav.Link as={Link} to="/login" className="custom-nav">
                  <i className="fa-solid fa-right-to-bracket"></i>會員登入
                </Nav.Link>
              )}
              {currentUser && (
                <NavDropdown title="個人頁面" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to="/posted-tour"
                    className="custom-nav-dropdown"
                  >
                    <i className="fa-solid fa-book"></i>發布的行程
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/liked-tour"
                    className="custom-nav-dropdown"
                  >
                    <i className="fa-solid fa-heart"></i>喜歡的行程
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/profile"
                    className="custom-nav-dropdown"
                  >
                    <i className="fa-solid fa-user"></i>個人資料
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {currentUser && (
                <Nav.Link as={Link} to="/post-tour" className="custom-nav">
                  <i className="fa-solid fa-plus"></i>新增行程
                </Nav.Link>
              )}

              <Nav.Link as={Link} to="/search-tour" className="custom-nav">
                <i className="fa-solid fa-magnifying-glass"></i>搜尋行程
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="custom-nav">
                <i className="fa-solid fa-envelope"></i>聯絡我們
              </Nav.Link>
              {currentUser && (
                <Nav.Link
                  as={Link}
                  to="/"
                  className="custom-nav"
                  onClick={logoutHandler}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>登出
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
