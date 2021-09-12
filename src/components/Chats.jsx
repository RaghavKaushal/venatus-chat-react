import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpg" });
  };
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "e7a3a240-7aa5-498d-baf3-dcfabaf2dda9",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formData, {
              headers: {
                "private-key": "b85ff943-6355-4685-b6a6-756740e003b6",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);
  if (!user || loading) return "Loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Venatus Chat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="e7a3a240-7aa5-498d-baf3-dcfabaf2dda9"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
