import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
const LogIn = ({ access, setAccess }) => {
  const cookiesLog = new Cookies();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/usuarios/login`, login)
      .then((response) => response.data)
      .then((data) => {
        // Usuario logeado correctamente
        console.log("Usuario logeado");
        //comprobamos cookiesLog
        setAccess(true);
        //guardamos las cookiesLog
        cookiesLog.set("userId", data.userId, { path: "/" });
        cookiesLog.set("nombre", data.nombre, { path: "/" });
        cookiesLog.set("apellidos", data.apellidos, { path: "/" });
        cookiesLog.set("email", data.email, { path: "/" });
        cookiesLog.set("telefono", data.telefono, { path: "/" });
        cookiesLog.set("token", data.token, { path: "/" });

        //  swal(`Bienvenid@ ${data.nombre}`,"",  );
        // window.location.href = "./";
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Bienvenid@ ${data.nombre}`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "./";
        });
      })
      .catch((error) => {
        // console.log(error.response.data);
        Swal.fire({
			position: "top",
			icon: "warning",
			title: `Error al intentar iniciar sesión`,
			text: 'Comprueba tus datos',
			showConfirmButton: false,
			timer: 1500,
		  })
      });
  };
  return (
    <>
      <div className="log-in col mt-5">
        <div className="modal-con">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-muted fw-bold"
                  id="staticBackdropLabel"
                >
                  INICIAR SESIÓN
                </h5>
              </div>
              <form action="" onSubmit={submitForm}>
                <div className="modal-body">
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      <ion-icon name="person-circle"></ion-icon>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Introduce tu email"
                      name="email"
                      onChange={handleInputs}
                      required
                    />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      <ion-icon name="key"></ion-icon>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Introduce tu contraseña"
                      name="password"
                      onChange={handleInputs}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Aceptar
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
