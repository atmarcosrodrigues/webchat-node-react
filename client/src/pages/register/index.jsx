/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import axios from "axios";
import Logo from "../../assets/logo.svg";
import * as ToastMessages from "../../utils/ToastMessages";
import {
  alreadyHaveAccount,
  appTitle,
  loginButton,
} from "../../utils/Constants";
import { toastOptions, FormContainer } from "./styles";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from "../../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(ToastMessages.passwordConfirmation, toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error(ToastMessages.invalidUsername, toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(ToastMessages.invalidPassword, toastOptions);
      return false;
    } else if (email === "") {
      toast.error(ToastMessages.requiredEmail, toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1> {appTitle} </h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            {alreadyHaveAccount} <Link to="/login"> {loginButton} </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
