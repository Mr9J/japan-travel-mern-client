import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async () => {
    AuthService.login(email, password)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.alert("登入成功，您將被導向至個人頁面...");
        setCurrentUser(AuthService.findCurrentUser());
        navigate("/profile");
      })
      .catch((e) => {
        setMsg(e.response.data);
      });
  };

  return (
    <div className="login">
      <Form className="form-custom">
        {msg && <div className="alert alert-danger">{msg}</div>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>註冊信箱</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={emailHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
          />
        </Form.Group>
        <Button variant="light btn-lg mt-3" onClick={loginHandler}>
          登入
        </Button>
      </Form>
    </div>
  );
};

export default Login;
