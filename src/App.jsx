import "./Styles/map.css";
import { useEffect, useState } from "react";
import Layout from "./Components/Layout";
import MapView from "./Components/MapView";
import VisitadosView from "./Components/ListaVisitadosView";
import DeseadosView from "./Components/ListaDeseadosView";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [geoData, setGeoData] = useState(null);
  const [countryInfo, setCountryInfo] = useState({});
  const [visitados, setVisitados] = useState([]);
  const [deseados, setDeseados] = useState([]);
  const [view, setView] = useState("map");
  const [isLogin, setisLogin] = useState(false);
  const [ModoAutenticacion, setModoAutenticacion] = useState("login");

  useEffect(() => {fetch("/countries.geojson").then((response) => response.json()).then((data) => setGeoData(data));}, []);

  const countryStyle = (feature) => {
    const name = feature.properties.name;

    if (visitados.includes(name)) {
      return { className: "pais visitado" };
    }

    if (deseados.includes(name)) {
      return { className: "pais deseado" };
    }

    return { className: "pais no visitado" };
};

  const ObtenerDatosPais = async (countryName) => {
    if (countryInfo[countryName]) return countryInfo[countryName];

    try {
      const resp = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

      const data = await resp.json();
      const country = data[0];

      setCountryInfo((prev) => ({...prev, [countryName]: country}));

      return country;
    } catch (err) {
      console.error("Error:", err);
      return null;
    }
  };

  const onEachFeature = (feature, layer) => {
    const countryName = feature.properties.name;

    layer.on({
      click: async (e) => {
        const data = await ObtenerDatosPais(countryName);
        const PaisesVisitados = visitados.includes(countryName);
        const PaisesDeseados = deseados.includes(countryName);

        layer.bindPopup(
          `<div>
            <strong>${countryName}</strong><br/>
            ${data ? `Capital: ${data.capital?.[0] || "N/A"}<br/>` : ""}
            ${data ? `Región: ${data.region || "N/A"}<br/>` : ""}
            ${data ? `Población: ${data.population?.toLocaleString() || "N/A"}<br/>` : ""}
            ${data ? `Bandera: <img src="${data.flags?.png}" alt="Bandera" style="width: 100px; height: auto; border: 2px solid black;" /><br/>` : ""}
            ${data ? `Moneda: ${Object.values(data.currencies || {"N/A": {name: "N/A"}})[0]?.name || "N/A"}<br/>` : ""}
            ${data ? `Idiomas: ${Object.values(data.languages || {"N/A": "N/A"}).join(", ")}<br/>` : ""}
            <button id="btn-visitado-${countryName}">
              ${PaisesVisitados ? "Marcar como no visitado" : "Marcar como visitado"}
            </button>

            ${!PaisesVisitados ? `
            <button id="btn-deseado-${countryName}">
              ${PaisesDeseados ? "Quitar de deseados" : "Marcar como deseado"}
            </button>
          ` : ""}
          </div>`
        ).openPopup(e.latlng);

        setTimeout(() => {
          const btnVisitado = document.getElementById(`btn-visitado-${countryName}`);
          if (btnVisitado) {
            btnVisitado.onclick = () => {
              setVisitados((prev) => {
                const yaVisitado = prev.includes(countryName);

                if (yaVisitado) {
                  return prev.filter((c) => c !== countryName);
                } else {
                  setDeseados((dPrev) =>
                    dPrev.filter((c) => c !== countryName)
                  );

                  return [...prev, countryName];
                }
              });
            };
          }

          const btnDeseado = document.getElementById(`btn-deseado-${countryName}`);
          if (btnDeseado) {
            btnDeseado.onclick = () => {
              if (visitados.includes(countryName)) return;

              setDeseados((prev) => {
                if (prev.includes(countryName)) {
                  return prev.filter((c) => c !== countryName);
                } else {
                  return [...prev, countryName];
                }
              });
            };
          }
        }, 0);
      },
    });
  };

  if (!isLogin) {
    if (ModoAutenticacion === "login") {
      return (<Login onLogin={() => setisLogin(true)} goToRegister={() => setModoAutenticacion("register")}/>);
    }

    return (<Register onRegister={() => setModoAutenticacion("login")} goToLogin={() => setModoAutenticacion("login")}/>);
  }

  const usuario = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Layout view={view} setView={setView} onLogout={() => setisLogin(false)} nombreUsuario={usuario?.name}>
        {view === "map" ? (
          <MapView
            geoData={geoData}
            visitados={visitados}
            deseados={deseados}
            countryStyle={countryStyle}
            onEachFeature={onEachFeature}
          />
        ) : view === "lista" ? (
          <VisitadosView visitados={visitados}/>
        ) : (
          <DeseadosView deseados={deseados}/>
        )}
      </Layout>
    </div>
  );
}