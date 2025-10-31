import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bikes`)
      .then(res => setBikes(res.data))
      .catch(() => setError("Nie udało się pobrać rowerów"));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista rowerów</h2>
      <ul>
        {bikes.map(bike => (
          <li key={bike.id}>
            <Link to={`/bikes/${bike.id}`}>
              {bike.brand} {bike.model} ({bike.year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bikes;
