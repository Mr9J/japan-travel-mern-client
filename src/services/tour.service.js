import axios from "axios";
const API_URL = "https://scy-japan-travel-mern-api.onrender.com/api/tour";

class TourService {
  //get token   let token;
  getToken() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return token;
  }

  //profile, show posted tour history
  postTourReview(_id) {
    return axios.get(API_URL + "/user/" + _id, {
      headers: {
        Authorization: this.getToken(),
      },
    });
  }

  //get, search tour by tour id
  searchByTourID(_id) {
    return axios.get(API_URL + "/searchTourByID/" + _id, {
      headers: {
        Authorization: this.getToken(),
      },
    });
  }

  //post tour request
  post(title, description, budget) {
    return axios.post(
      API_URL,
      { title, description, budget },
      {
        headers: {
          Authorization: this.getToken(),
        },
      }
    );
  }

  //patch tour request
  patchTour(_id, title, description, budget) {
    return axios.patch(
      API_URL + "/" + _id,
      { title: title, description: description, budget: budget },
      {
        headers: {
          Authorization: this.getToken(),
        },
      }
    );
  }

  //search tour by title
  searchTourByTitle(title) {
    return axios.get(API_URL + "/searchTourByTitle/" + title, {
      headers: { Authorization: this.getToken() },
    });
  }

  //give a like
  giveALike(_id, user_id) {
    return axios.post(
      API_URL + "/like/" + _id,
      { _id, user_id },
      {
        headers: { Authorization: this.getToken() },
      }
    );
  }

  //get liked tour
  getLikedTour(_id) {
    return axios.get(API_URL + "/liked/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  //delete tour
  delete(_id) {
    return axios.delete(API_URL + "/" + _id, {
      headers: { Authorization: this.getToken() },
    });
  }

  //comment
  comment(_id, comment) {
    return axios.post(
      API_URL + "/comment/" + _id,
      { comment },
      {
        headers: { Authorization: this.getToken() },
      }
    );
  }
}

const tourService = new TourService();

export default tourService;
