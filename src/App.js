import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage-component";
import Register from "./components/Register-component";
import Login from "./components/Login-component";
import Profile from "./components/Profile-component";
import PostedTour from "./components/PostedTour-component";
import LikedTour from "./components/LikedTour-component";
import PostTour from "./components/PostTour-component";
import SearchTour from "./components/SearchTour-component";
import Contact from "./components/Contact-component";
import PatchTour from "./components/PatchTour-component";
import AuthService from "./services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.findCurrentUser());

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<Homepage />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route
              path="login"
              element={
                <Login
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Profile
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="posted-tour"
              element={
                <PostedTour
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="liked-tour"
              element={
                <LikedTour
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="post-tour"
              element={
                <PostTour
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="search-Tour"
              element={
                <SearchTour
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="patch-tour/:_id"
              element={
                <PatchTour
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route path="contact" element={<Contact />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
