import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [message, setMessage] = useState("Łączenie z backendem...");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/hello`)
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Błąd połączenia z backendem"));
  }, [API_URL]);

  return (
    <div>
      <h2>Strona główna</h2>
      <p>{message}</p>
    </div>
  );
}

export default Home;
