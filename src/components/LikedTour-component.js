import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TourService from "../services/tour.service";
import Card from "react-bootstrap/Card";

const LikedTour = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [tourData, setTourData] = useState(null);

  const directToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      TourService.getLikedTour(_id)
        .then((data) => {
          setTourData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser]);

  return (
    <div className="liked-tour">
      {!currentUser && (
        <div>
          <div className="alert alert-danger">
            您必須先登入才能查看喜歡的行程
          </div>
          <button className="btn btn-light btn-lg" onClick={directToLogin}>
            返回登入頁面
          </button>
        </div>
      )}
      {currentUser && tourData && tourData.length !== 0 && (
        <div className="tour-data">
          <p>收藏的行程 : </p>
          {tourData.map((tour) => {
            return (
              <Card
                key={tour._id}
                style={{ width: "90vw", marginBottom: "10px" }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "2rem" }}>
                    行程主題: {tour.title}
                  </Card.Title>
                  <Card.Text className="description">
                    行程規劃:
                    <br />
                    {tour.description}
                  </Card.Text>
                  <Card.Text>預算: {tour.budget}</Card.Text>
                  <Card.Text>
                    <i className="fa-solid fa-thumbs-up"></i>:
                    {tour.liked.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LikedTour;
