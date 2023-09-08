import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import TourService from "../services/tour.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

const PostedTour = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [tourData, setTourData] = useState(null);

  const directToLogin = () => {
    navigate("/login");
  };

  const deleteTour = (e) => {
    console.log(e.target.id);
    TourService.delete(e.target.id)
      .then(() => {
        window.alert("刪除成功");
        updateTourData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTourData = useCallback(() => {
    const updatingTourData = () => {
      let _id;
      if (currentUser) {
        _id = currentUser.user._id;
        if (currentUser.user) {
          TourService.postTourReview(_id)
            .then((data) => {
              setTourData(data.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    };
    updatingTourData();
  }, [currentUser]);

  useEffect(() => {
    updateTourData();
  }, [updateTourData]);

  return (
    <div className="posted-tour">
      {!currentUser && (
        <div>
          <div className="alert alert-danger">您必須先登入才能查看行程</div>
          <button className="btn btn-light btn-lg" onClick={directToLogin}>
            返回登入頁面
          </button>
        </div>
      )}
      {currentUser && tourData && tourData.length !== 0 && (
        <div className="tourData">
          {tourData.map((tour) => {
            return (
              <Card
                key={tour._id}
                style={{ width: "90vw", padding: "1rem", margin: "0.5rem" }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "2rem" }}>
                    行程主題 : {tour.title}
                  </Card.Title>
                  <Card.Text className="description">
                    行程規劃 :
                    <br />
                    {tour.description}
                  </Card.Text>
                  <Card.Text>
                    行程預算 :
                    <br />
                    {tour.budget}
                  </Card.Text>
                  <Card.Text>
                    留言 : <br />
                    {tour.comment.map((line) => {
                      return <p className="comment-custom">{line}</p>;
                    })}
                  </Card.Text>
                  <Card.Text>
                    <i className="fa-solid fa-thumbs-up"></i>
                    {tour.liked.length}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={"/patch-tour/" + tour._id}
                    id={tour._id}
                    variant="primary btn-lg m-3"
                  >
                    修改
                  </Button>
                  <Button
                    id={tour._id}
                    onClick={deleteTour}
                    variant="primary btn-lg"
                  >
                    刪除
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostedTour;
