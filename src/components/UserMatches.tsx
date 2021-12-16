import React, { Fragment, useEffect, useState } from "react";
import { Animal } from "../interfaces/animales";
import NavBar from "./NavBar";
import axios from "axios";
import "../css/UserMatches.css";
import Cookies from "universal-cookie";
import { User, UserGet } from "../interfaces/user";

const UserMatches = () => {
  const [errorMsg, setErrorMsg] = useState("No tiene ningún match aún");
  const [userAnimal, setUserAnimal] = useState<Animal>({
    name: "No hay animal",
    image:
      "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
    petCategory: "",
    petSex: "",
    petAge: "",
  });

  const [matches, setMatches] = useState<Array<User>>([]);

  useEffect(() => {
    try {
      const cookie = new Cookies();

      axios
        .get("http://localhost:3001/user", {
          params: {
            mail: cookie.get("mail"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUserAnimal({
              name: res.data.firstName,
              image: res.data.image,
              petCategory: res.data.petCategory,
              petSex: res.data.petSex,
              petAge: res.data.petAge,
            });
          } else {
            console.log("Error al obtener foto del usuario");
          }
        })
        .then(() => setErrorMsg(""));
    } catch (e) {
      setErrorMsg("No se pudo obtener su foto de usuario");
    }
  }, []);

  useEffect(() => {
    try {
      const cookie = new Cookies();
      axios({
        method: "get",
        params: {
          mail: cookie.get("mail"),
        },
        url: "http://localhost:3001/user/mutualmatches",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach((element: UserGet) => {
              setMatches((data) => [
                ...data,
                {
                  firstName: element.firstName,
                  lastName: element.lastName,
                  mail: element.mail,
                  animal: {
                    name: element.petName,
                    image: element.image,
                    petSex: element.petSex,
                    petCategory: element.petCategory,
                    petAge: element.petAge,
                  },
                },
              ]);
            });
          } else {
            console.log("Error al obtener matches");
          }
        })
        .then(() => setErrorMsg(""));
    } catch (e) {
      setErrorMsg("No se pudo obtener sus matches");
    }
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className="container">
        <div className="col pet-photo-container mt-4">
          <img
            src={userAnimal.image}
            alt="petPhoto"
            className="pet-photo col-sm-2 shadow mt-4"
          />
          <h1 className="text-center pet_title mt-4 mb-5 overflow-hidden">
            {userAnimal.name}
          </h1>
        </div>
        <div className="container-flex p-2">
          {matches && matches.length > 0 ? (
            matches.map((user: User, index: number) => {
              return (
                <div
                  className="card col-sm-3 match_pet_card shadow mb-5"
                  key={index}
                >
                  <img
                    className="match_pet_img"
                    src={user.animal.image}
                    alt="petImage"
                  />
                  <div className="card-body">
                    <h5 className="card-title overflow-hidden">
                      {user.animal.name}
                    </h5>
                    <p className="match_card_text card-text">{user.mail}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">EDAD: {user.animal.petAge}</li>
                    <li className="list-group-item">
                      TIPO: {
                      user.animal.petCategory === "DOG"? "PERRO" : "GATO"
                      }
                    </li>
                    <li className="list-group-item">SEXO: {
                      user.animal.petSex === "FEMALE" ? "FEMENINO" : "MASCULINO"
                    }</li>
                  </ul>
                </div>
              );
            })
          ) : (
            <div>
              {errorMsg ? (
                <p className="text-danger h6">{errorMsg}</p>
              ) : (
                <span></span>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserMatches;
