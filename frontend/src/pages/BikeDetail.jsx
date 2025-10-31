import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BikeDetail() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bikes/${id}`)
      .then(res => setBike(res.data))
      .catch(err => {
        if (err.response) {
          setError(`Błąd ${err.response.status}: ${err.response.data.error}`);
        } else {
          setError("Błąd połączenia z backendem");
        }
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!bike) return <p>Ładowanie szczegółów roweru...</p>;

  return (
    <div>
      <h2>Szczegóły roweru</h2>
      <p><strong>Marka:</strong> {bike.brand}</p>
      <p><strong>Model:</strong> {bike.model}</p>
      <p><strong>Rok:</strong> {bike.year}</p>
    </div>
  );
}

export default BikeDetail;
