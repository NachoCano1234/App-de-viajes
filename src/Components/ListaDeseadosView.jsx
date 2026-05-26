export default function DeseadosView({ deseados }) {
  return (
    <div className="ListaPaises">
      <h2>Países deseados</h2>
      {deseados.length === 0 ? (
        <>
            <p>No has marcado ningún país como deseado aún.</p>
            <img src="/Persona mirando mapa.jpg" />
        </>
      ) : (
        <ul>
            <p><strong>Total:</strong> {deseados.length}</p>
            {deseados.map((pais) => (
                <li key={pais}>{pais}</li>
            ))}
        </ul>
      )}
    </div>
  );
}