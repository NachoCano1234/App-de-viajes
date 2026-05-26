import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function MapView({ geoData, visitados, deseados, countryStyle, onEachFeature }) {
  return (
    <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{height: "100vh", width: "100%"}}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
    >
    <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true}/>

    {geoData && (
        <GeoJSON
            key={`${visitados.length}-${deseados.length}`}
            data={geoData}
            onEachFeature={onEachFeature}
            style={countryStyle}
        />
    )}
    </MapContainer>
  );
}