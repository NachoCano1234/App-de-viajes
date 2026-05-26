export default function Layout({ view, setView, onLogout, nombreUsuario, children }) {
  return (
    <>
      <div className="layout">
        <p> ¡Bienvenido {nombreUsuario}! </p>
        <button onClick={() => setView("map")}>Mapa</button>
        <button onClick={() => setView("lista")}>Países visitados</button>
        <button onClick={() => setView("deseados")}>Países deseados</button>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>

      <div>
        {children}
      </div>
    </>
  );
}