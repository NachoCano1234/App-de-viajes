export default function VisitadosView({ visitados }) {
  return (
    <div className="ListaPaises">
      <h2>Países visitados</h2>
      {visitados.length === 0 ? (
        <>
            <p>No has marcado ningún país como visitado aún.</p>
            <img src="/Persona mirando mapa.jpg" />
        </>
      ) : (
        <ul>
            <p><strong>Total:</strong> {visitados.length}</p>
            {visitados.map((pais) => (
                <li key={pais}>{pais}</li>
            ))}
        </ul>
      )}
    </div>
  );
}