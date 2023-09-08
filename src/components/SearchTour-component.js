import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TourService from "../services/tour.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

const SearchTour = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  let [comment, setComment] = useState("");

  const directToLogin = () => {
    navigate("/login");
  };
  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const commentInputHandler = (e) => {
    setComment(e.target.value);
  };
  const commentSubmit = (e) => {
    TourService.comment(e.target.id, comment)
      .then(() => {
        window.alert("送出留言");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchHandler = () => {
    TourService.searchTourByTitle(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const likeTourIDHandler = (e) => {
    console.log(e.target.id);
    TourService.giveALike(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("收藏成功");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="search-tour">
      {/* login check */}
      {!currentUser && (
        <div>
          <div className="alert alert-danger">您必須先登入才能使用搜尋功能</div>
          <button className="btn btn-light btn-lg" onClick={directToLogin}>
            返回登入頁面
          </button>
        </div>
      )}
      {/* search bar */}
      {currentUser && (
        <InputGroup className="mb-3 searchbar-custom">
          <Form.Control
            className="searchbar-custom"
            placeholder="搜尋感興趣的行程"
            aria-label="search-tour"
            aria-describedby="basic-addon2"
            onChange={searchInputHandler}
          />
          <Button
            className="searchbar-custom-button btn-primary"
            variant="outline-light"
            id="button-addon2"
            onClick={searchHandler}
          >
            搜尋
          </Button>
        </InputGroup>
      )}
      {/* search result */}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div className="search-result">
          <p>搜尋結果 : </p>
          {searchResult.map((tour) => {
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
                    留言 : <br />
                    {tour.comment.map((line) => {
                      return <p className="comment-custom">{line}</p>;
                    })}
                  </Card.Text>
                  <Card.Text>
                    <i className="fa-solid fa-thumbs-up"></i>:
                    {tour.liked.length}
                  </Card.Text>
                  <Button
                    id={tour._id}
                    variant="primary btn-lg m-3"
                    onClick={likeTourIDHandler}
                  >
                    <i className="fa-solid fa-thumbs-up"></i> 收藏
                  </Button>
                  <InputGroup className="mb-3 commentbar-custom">
                    <Form.Control
                      className="commentbar-custom"
                      placeholder="留言"
                      aria-label="comment-tour"
                      aria-describedby="basic-addon2"
                      onChange={commentInputHandler}
                    />
                    <Button
                      className="searchbar-custom-button btn-primary"
                      variant="outline-light"
                      id={tour._id}
                      onClick={commentSubmit}
                    >
                      留言
                    </Button>
                  </InputGroup>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchTour;
