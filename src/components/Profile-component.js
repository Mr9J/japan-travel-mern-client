import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const directToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="profile">
      {!currentUser && (
        <div>
          <div className="alert alert-danger">您必須先登入才能查看個人資料</div>
          <button className="btn btn-light btn-lg" onClick={directToLogin}>
            返回登入頁面
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <h2>您的個人檔案：</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>用戶名稱：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
