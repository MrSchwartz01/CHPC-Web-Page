import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de login (solo maqueta)
    await axios.post("/api/users/login", { username, password });
    alert("Login simulado");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Entrar</button>
    </form>
  );
}