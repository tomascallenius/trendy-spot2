import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../alerta/Alerta";
import axiosClient from "../../contextlogin/config/axiosClient";
import "./styles.css";
import imageLogo from "./trendy-spot-logo.png";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los Passwords no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear usuario de la api

    try {
      const { data } = await axiosClient.post(`/users`, {
        name,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  setTimeout(() => {
    setAlerta({});
  }, 6000);

  const { msg } = alerta;

  return (
    <>
      <div className="mainRegister">
        <h3 className="titleLogin">Crea una cuenta para hacer tu compra</h3>

        {msg && <Alerta alerta={alerta} />}

        <form action="" className="formRegister" onSubmit={handleSubmit}>
          <div className="columna">
            <div className="divInput">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu name"
                className="input"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
              />
            </div>

            <div className="divInput">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="input"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
            </div>

            <div className="divInput">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
            </div>

            <div className="divInput">
              <label className="label" htmlFor="password">
                Repetir Password
              </label>
              <input
                id="password2"
                type="password"
                placeholder="Repetir tu Password"
                className="input"
                value={repetirPassword}
                onChange={(e) => handleInputChange(e, setRepetirPassword)}
              />
            </div>
          </div>

          <div className="columna">
            <img src={imageLogo} alt="logo-home" className="logoRegister" />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="btnCreateAccount"
          />
        </form>

        <nav className="navRegister">
          <Link className="linksRegister" to="/login">
            ¿Tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="linksRegister" to="/olvide-password">
            Olvidé Mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};
