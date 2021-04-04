import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Frase from "./components/Frase";
import Spinner from "./components/Spinner";

function App() {
  const [fraseSimpsons, setFraseSimpsons] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    setLoader(true);
    const api = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes");
    const resp = await api.json();
    console.log(api);
    console.log(resp[0]);
    setTimeout( () =>{
      setFraseSimpsons(resp[0]);
      setLoader(false);
    }, 1000)
   
  };

  const cargarComponente = loader ? (
    <Spinner></Spinner>
  ) : (
    <Frase fraseSimpsons={fraseSimpsons}></Frase>
  );

  return (
    <section className="container text-center my-5">
      <article className="d-flex flex-column align-items-center">
        <img
          src={process.env.PUBLIC_URL + "/logoS.png"}
          className="w-75"
          alt="logo"
        ></img>
        <button
          className="btn btn-warning w-50 shadow my-5"
          onClick={() => consultarAPI()}
        >
          Obtener Frase
        </button>
      </article>
      {cargarComponente}
    </section>
  );
}

export default App;
