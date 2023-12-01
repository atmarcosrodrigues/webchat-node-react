/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import loader from "../../assets/loader.gif";

import * as ToastMessages from "../../utils/ToastMessages";
import { toastOptions, Container } from "./styles";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";

export default function SetAvatar() {
  const appLocalHostKey = process.env.REACT_APP_LOCALHOST_KEY;
  const avatarApi = process.env.REACT_APP_AVATAR_API;

  console.log(appLocalHostKey);
  console.log(avatarApi);

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  console.log(" == set avatar ==");

  useEffect(async () => {
    if (!localStorage.getItem(appLocalHostKey)) navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    console.log(" == set avatar 2 ==");
    console.log(selectedAvatar);
    if (selectedAvatar === undefined) {
      toast.error(ToastMessages.selectAvatar, toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem(appLocalHostKey));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error(ToastMessages.setAvatarError, toastOptions);
      }
    }
  };

  console.log(" == set avatar 3 ==");
  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      console.log(" == set avatar API ==");
      console.log(avatarApi);
      const image = await axios.get(
        `${avatarApi}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  console.log(" == set avatar 4 ==");
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
