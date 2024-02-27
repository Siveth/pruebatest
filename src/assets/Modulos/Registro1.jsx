import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { BiHide, BiShow } from "react-icons/bi";
import '../styles/Hide.css'

function Register() {
  const navigate = useNavigate();
  const [ShowPwd, setShowPwd] = useState(false);
  const [ShowPwds, setShowPwds] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  // const [mensaje, setMensaje] = useState("");
  const [edad, setEdad] = useState("");
  const [error, setError] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const validarCampo = (valor) => {
    return valor.trim() !== "";
  };

  const validarCorreo = (valor) => {
    const correoRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return correoRegex.test(valor);
  };

  const validarTelefono = (valor) => {
    const telefonoRegex = /^\d{8,14}$/;
    return telefonoRegex.test(valor);
  };

  const validarContrasenia = (valor) => {
    return valor.length >= 8;
  };

  const validarApellido = (valor) => {
    const apellidoRegex = /^[A-Za-z\u00C0-\u017F\s]+$/;

    return apellidoRegex.test(valor);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos
    if (
      !validarCampo(nombre) ||
      !validarCampo(apellidoPaterno) ||
      !validarCampo(apellidoMaterno) ||
      !validarCampo(correo) ||
      !validarCampo(telefono) ||
      !validarCampo(contrasenia) ||
      !validarCampo(edad)
    ) {
      setError("Hay campos vacíos");
      return;
    }

    // Validación de correo electrónico
    

    

    

    // Validación de contraseña repetida
    if (contrasenia !== repetirContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validación de reCAPTCHA
   
    if (!recaptchaValue) {
      setError("Por favor, verifica que no eres un robot");
      return;
    }
  
    setError("");

    // Resto del código para registrar al usuario
    try {
      const response = await Axios.post(
        "http://localhost:3001/Create",
        {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          correo,
          telefono,
          contrasenia,
          edad,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data.status === "success" ||
        response.data.Status === "success"
      ) {
        alert("Registro exitoso\nTu cuenta ha sido registrada correctamente");
        navigate("/Login");
      } else {
        alert("Error\nRegistro fallido");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error\nOcurrió un error al intentar registrar");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-5 md:p-10 flex-col w-11/12 mt-10 mb-10 sm:mx-auto max-w-80rem">
      <div className="flex flex-wrap">
        <div className="md:w-1/2 mt-2">
          <img
            src="/src/img/autobus.png"
            className="w-full rounded-start mt-4"
            alt="Autobus"
          />
        </div>
        <div className="md:w-1/2 mt-2">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight pb-2.5 text-gray-900">
            Crear Cuenta
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="w-5/12 ml-5">
                <label htmlFor="Nombre" className="font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${
                    error && (!validarCampo(nombre) || !validarApellido(nombre))
                      ? "border-red-500"
                      : validarCampo(nombre) && validarApellido(nombre)
                      ? "border-green-500"
                      : ""
                  }`}
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                  required
                />
                {error && !validarCampo(nombre) && (
                  <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
                {error && !validarApellido(nombre) && (
                  <span className="text-red-600 text-sm">Nombre inválido</span>
                )}
              </div>

              <div className="w-5/12 ml-5">
                <label htmlFor="ApellidoP" className="font-bold">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${
                    error &&
                    (!validarCampo(apellidoPaterno) ||
                      !validarApellido(apellidoPaterno))
                      ? "border-red-500"
                      : validarCampo(apellidoPaterno) &&
                        validarApellido(apellidoPaterno)
                      ? "border-green-500"
                      : ""
                  }`}
                  id="apellidopa"
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  placeholder="Apellido Paterno"
                  required
                />
                {error && !validarCampo(apellidoPaterno) && (
                  <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
                {error && !validarApellido(apellidoPaterno) && (
                  <span className="text-red-600 text-sm">
                    Apellido paterno inválido
                  </span>
                )}
              </div>
            </div>

            {/* Apellido Materno */}
            <div className="flex mb-4">
              <div className="w-5/12 ml-5">
                <label htmlFor="ApellidoM" className="font-bold">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${
                    error &&
                    (!validarCampo(apellidoMaterno) ||
                      !validarApellido(apellidoMaterno))
                      ? "border-red-500"
                      : validarCampo(apellidoMaterno) &&
                        validarApellido(apellidoMaterno)
                      ? "border-green-500"
                      : ""
                  }`}
                  id="apellidoma"
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                  placeholder="Apellido Materno"
                  required
                />
                {error && !validarCampo(apellidoMaterno) && (
                  <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
                {error && !validarApellido(apellidoMaterno) && (
                  <span className="text-red-600 text-sm">
                    Apellido materno inválido
                  </span>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div className="w-5/12 ml-5">
                <label htmlFor="Fecha" className="font-bold">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${
                    error && !validarCampo(edad) ? "border-red-500" : ""
                  }`}
                  id="edad"
                  name="edad"
                  placeholder="Edad"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  required
                />
                {error && !validarCampo(edad) && (
                  <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
              </div>
            </div>

            {/* Correo */}
            <div className="flex mb-4">
              <div className="w-5/12 ml-5">
                <label htmlFor="Email" className="font-bold">
                  Email
                </label>
                <input
                  type="text"
                  className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${
                    error && (!validarCampo(correo) || !validarCorreo(correo))
                      ? "border-red-500"
                      : validarCampo(correo) && validarCorreo(correo)
                      ? "border-green-500"
                      : ""
                  }`}
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                />
                {error && !validarCampo(correo) && (
                  <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
                {error && !validarCorreo(correo) && (
                  <span className="text-red-600 text-sm">
                    Correo electrónico inválido12
                  </span>
                )}
              </div>

              {/* Teléfono */}
              <div className="w-5/12 ml-5">
                <label htmlFor="Telefono" className="font-bold">
                  Teléfono
                </label>
                <input
                  type="text"
                  className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${
                    error &&
                    (!validarCampo(telefono) || !validarTelefono(telefono))
                      ? "border-red-500"
                      : validarCampo(telefono) && validarTelefono(telefono)
                      ? "border-green-500"
                      : ""
                  }`}
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono"
                  required
                />
                {error && !validarCampo(telefono) && (
                  <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
                {error && !validarTelefono(telefono) && (
                  <span className="text-red-600 text-sm">
                    Teléfono inválido
                  </span>
                )}
              </div>
            </div>
            {/* Contraseña */}
            <div className="flex mb-4">
              <div className="w-5/12 ml-5">
                <label htmlFor="Contraseña" className="font-bold">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={ShowPwd ? "text" : "password"}
                    className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2  outline-none text-neutral-800 ${
                      error &&
                      (!validarCampo(contrasenia) ||
                        !validarContrasenia(contrasenia))
                        ? "border-red-500"
                        : validarCampo(contrasenia) &&
                          validarContrasenia(contrasenia)
                        ? "border-green-500"
                        : ""
                    }${ShowPwd ? "" : "hide-password-icon"}`}
                    id="contrasenia"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    placeholder="Contraseña"
                    required
                    
                  />
                  <div
                    className="absolute inset-y-0 top-1.5 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPwd(!ShowPwd)}
                  >
                    {ShowPwd ? (
                      <BiHide className="text-indigo-600 text-xl" />
                    ) : (
                      <BiShow className="text-indigo-500 text-xl" />
                    )}
                  </div>
                </div>
                {error && !validarCampo(contrasenia) && (
                  <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
                {error && !validarContrasenia(contrasenia) && (
                  <span className="text-red-600 text-sm">
                    La contraseña debe tener al menos 8 caracteres
                  </span>
                )}
              </div>

              {/* Confirmación de contraseña */}
              <div className="w-5/12 ml-5">
                <label htmlFor="RepetirContraseña" className="font-bold">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={ShowPwds ? "text" : "password"}
                    className={`w-full rounded border border-gray-300 bg-inherit p-3  shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${
                      error &&
                      (!validarCampo(repetirContrasena) ||
                        repetirContrasena !== contrasenia)
                        ? "border-red-500"
                        : validarCampo(repetirContrasena) &&
                          repetirContrasena === contrasenia
                        ? "border-green-500"
                        : ""
                    }${ShowPwds ? "" : "hide-password-icon"}`}
                    id="repetirContrasena"
                    value={repetirContrasena}
                    onChange={(e) => setRepetirContrasena(e.target.value)}
                    placeholder="Repetir Contraseña"
                    required
                   
                  />
                  <div
                    className="absolute inset-y-0 top-1.5 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPwds(!ShowPwds)}
                  >
                    {ShowPwds ? (
                      <BiHide className="text-indigo-600 text-xl" />
                    ) : (
                      <BiShow className="text-indigo-500 text-xl" />
                    )}
                  </div>
                </div>
                {error && !validarCampo(repetirContrasena) && (
                <span className="text-red-600 text-sm">
                    Campo obligatorio
                  </span>
                )}
                {error && repetirContrasena !== contrasenia && (
                  <span className="text-red-600 text-sm">
                    Las contraseñas no coinciden
                  </span>
                )}
              </div>
            </div>

            {/* ReCAPTCHA */}
            {/* <div id="miCaptcha" className="flex justify-center mt-4">
        <ReCAPTCHA
          id="miCaptchaElemento" // Agrega el id al elemento ReCAPTCHA
          sitekey="6LcqzmwpAAAAAHS95sakGoUwrQ73VRwYLVullfts"
          onChange={(value) => setRecaptchaValue(value)}
        />
      </div> */}
            {/* Mensaje de error */}
            {error && (
              <div className="text-red-600 text-sm text-center mb-4">
                {error}
              </div>
            )}

            {/* Botón de registro */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-5/12 mx-auto mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

/* catch (error) {
        if (error.response) {
           if (error.response.status === 400) {
        Redirige a la página de Error400 si el código de estado es 400
             window.location.href = "/Error400";
           } else if (error.response.status === 500) {
              Redirige a la página de Error500 si el código de estado es 500
             window.location.href = "/Error500";
           } else {
              Muestra un mensaje de error detallado si es posible
             alert("Error en el inicio de sesión: " + error.response.data.message);
          }
       }
        if (error.request) {
          La solicitud fue realizada pero no se recibió respuesta
         console.error("No se recibió respuesta del servidor");
        
       } else {
          Ocurrió un error antes de enviar la solicitud
         console.error("Error al enviar la solicitud:", error.message);
       }
      
     }
   }; */
