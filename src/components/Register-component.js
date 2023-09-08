import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Register = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [password_confirm, setPassword_confirm] = useState("");
  let [msg, setMsg] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const passwordConfirmHandler = (e) => {
    setPassword_confirm(e.target.value);
  };
  const registerHandler = () => {
    AuthService.register(username, email, password, password_confirm)
      .then(() => {
        window.alert("註冊完成，您將被導向至登入頁面...");
        navigate("/login");
      })
      .catch((e) => {
        setMsg(e.response.data);
      });
  };
  return (
    <div className="register">
      <Form className="form-custom">
        {msg && <div className="alert alert-danger">{msg}</div>}
        <Form.Group className="mb-3">
          <Form.Label>用戶名稱</Form.Label>
          <Form.Control
            id="username"
            placeholder="username"
            onChange={usernameHandler}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>確認密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={passwordConfirmHandler}
          />
        </Form.Group>
        <Button variant="light btn-lg mt-3" onClick={registerHandler}>
          註冊
        </Button>
      </Form>
    </div>
  );
};

export default Register;
