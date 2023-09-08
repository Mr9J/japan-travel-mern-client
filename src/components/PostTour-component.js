import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TourService from "../services/tour.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PostTour = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [budget, setBudget] = useState(0);
  let [msg, setMsg] = useState("");

  const directToLogin = () => {
    navigate("/login");
  };
  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const budgetChangeHandler = (e) => {
    setBudget(e.target.value);
  };
  const postTour = () => {
    TourService.post(title, description, budget)
      .then(() => {
        window.alert("行程已創建成功");
        navigate("/posted-tour");
      })
      .catch((error) => {
        console.log(error.response);
        setMsg(error.response.data);
      });
  };

  return (
    <div className="post-tour">
      {!currentUser && (
        <div>
          <div className="alert alert-danger">您必須先登入才能新增行程</div>
          <Button className="btn-light btn-lg" onClick={directToLogin}>
            返回登入頁面
          </Button>
        </div>
      )}
      {currentUser && (
        <Form className="form-custom">
          {msg && <div className="alert alert-danger">{msg}</div>}
          <Form.Group className="mb-3">
            <Form.Label>行程主題</Form.Label>
            <Form.Control
              className="form-custom"
              placeholder="行程主題"
              onChange={titleChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>行程規劃</Form.Label>
            <Form.Control
              className="form-custom"
              as="textarea"
              rows={10}
              placeholder="行程規劃"
              onChange={descriptionChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>預算</Form.Label>
            <Form.Control
              className="form-custom"
              type="number"
              placeholder="預算"
              onChange={budgetChangeHandler}
            />
          </Form.Group>
          <Button variant="light btn-lg mt-3" onClick={postTour}>
            發布
          </Button>
        </Form>
      )}
    </div>
  );
};

export default PostTour;
