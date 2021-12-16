import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const updateState = (value: string, func: (a: string) => void) => {
    func(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !pass.trim()) return setErrorMsg("Campo Obligatorio");

    const objectData = {
      mail: email,
      password: pass,
    };

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/auth/login",
        data: objectData,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        const cookies = new Cookies();
        cookies.set("mail", response.data.mail);
        navigate("/match");
      } else {
        console.log("entro");
      }
    } catch (error) {
      setErrorMsg("Error al loguear");
    }
  };

  return (
    <div className="row mt-5">
      <div className="col"></div>
      <div className="col">
        <h1 className="login-title mb-5 text-center">
          Loguearse en Animal Tinder
        </h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control w-100 mt-5"
            placeholder="ejemplo@email.com"
            onChange={(e) => updateState(e.target.value, setEmail)}
          />
          {errorMsg !== "" && !email.trim() ? (
            <p className="text-danger mt-3">{errorMsg}</p>
          ) : (
            <span></span>
          )}
          <input
            type="password"
            className="form-control mt-4 w-100 mb-4"
            placeholder="Contraseña"
            onChange={(e) => updateState(e.target.value, setPass)}
          />
          {errorMsg !== "" && !pass.trim() ? (
            <p className="text-danger mt-3">{errorMsg}</p>
          ) : (
            <span></span>
          )}
          <a href="/register" className="link-primary a">
            ¡Registrate gratis!
          </a>
          <button
            className="btn btn-success btn-block mt-3 w-100"
            type="submit"
          >
            Iniciar sesión
          </button>
          {errorMsg === "Error al loguear" ? (
            <p className="text-danger mt-3">{errorMsg}</p>
          ) : (
            <span></span>
          )}
        </form>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Login;
