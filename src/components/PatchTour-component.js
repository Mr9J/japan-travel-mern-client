import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import TourService from "../services/tour.service";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const PatchTour = ({ currentUser, setCurrentUser }) => {
  let [tourData, setTourData] = useState(null);
  let [title, setTitle] = useState();
  let [description, setDescription] = useState();
  let [budget, setBudget] = useState();
  let [msg, setMsg] = useState("");
  let tourID = useParams();

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const budgetChangeHandler = (e) => {
    setBudget(e.target.value);
  };

  const patchTour = () => {
    let { _id } = tourID;
    let patchData = { title: title, description: description, budget: budget };
    console.log(patchData);
    TourService.patchTour(_id, title, description, budget)
      .then(() => {
        window.alert("修改完成");
        updateTourData();
      })
      .catch((error) => {
        setMsg(error.response.data);
      });
  };

  const updateTourData = useCallback(() => {
    const updatingTourData = async () => {
      let { _id } = tourID;
      TourService.searchByTourID(_id)
        .then((data) => {
          setTourData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    updatingTourData();
  }, [tourID]);

  useEffect(() => {
    updateTourData();
  }, [updateTourData]);

  return (
    <div className="patch-tour">
      {currentUser && tourData && (
        <div className="patch-form">
          <Form>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <Form.Group className="mb-3 form-custom">
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
                placeholder="行程預算"
                onChange={budgetChangeHandler}
              />
            </Form.Group>
            <Button variant="light btn-lg m-3" onClick={patchTour}>
              發布
            </Button>
          </Form>
        </div>
      )}
      {currentUser && tourData && (
        <div>
          <p>修改結果預覽 :</p>
          <Card style={{ width: "90vw", padding: "1rem", margin: "0.5rem" }}>
            <Card.Body>
              <Card.Title style={{ fontSize: "2rem" }}>
                行程主題 : {tourData.title}
              </Card.Title>
              <Card.Text className="description">
                行程規劃 :
                <br />
                {tourData.description}
              </Card.Text>
              <Card.Text>
                行程預算 :
                <br />
                {tourData.budget}
              </Card.Text>
              <Card.Text>
                <i className="fa-solid fa-thumbs-up"></i>
                {tourData.liked.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PatchTour;
