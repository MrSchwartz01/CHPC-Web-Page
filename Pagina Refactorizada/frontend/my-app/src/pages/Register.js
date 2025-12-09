import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de registro (solo maqueta)
    await axios.post("/api/users/register", { username, email, password });
    alert("Registro simulado");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Registrarse</button>
    </form>
  );
}